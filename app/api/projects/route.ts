/**
 * Projects API - List and Create
 *
 * GET /api/projects - List all projects for current user
 * POST /api/projects - Create a new project
 */

import { NextResponse } from "next/server"
import { createServerSupabase, getUser } from "@/lib/supabase/server"
import { plans } from "@/lib/payments/plans"

export async function GET() {
  try {
    const user = await getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const supabase = await createServerSupabase()

    const { data: projects, error } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false })

    if (error) {
      console.error("Error fetching projects:", error)
      return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
    }

    return NextResponse.json({ projects })
  } catch (error) {
    console.error("Projects GET error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const user = await getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const supabase = await createServerSupabase()

    // Check project limit
    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("plan")
      .eq("user_id", user.id)
      .single()

    const plan = subscription?.plan || "free"
    const projectLimit = plans[plan as keyof typeof plans]?.limits.projects ?? 3

    // Get current project count
    const { count } = await supabase
      .from("projects")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)

    if (projectLimit !== -1 && (count ?? 0) >= projectLimit) {
      return NextResponse.json(
        { error: "Project limit reached. Please upgrade your plan." },
        { status: 403 }
      )
    }

    // Create project
    const body = await request.json()
    const { name, description, data } = body

    if (!name) {
      return NextResponse.json({ error: "Project name is required" }, { status: 400 })
    }

    const { data: project, error } = await supabase
      .from("projects")
      .insert({
        user_id: user.id,
        name,
        description: description || null,
        data: data || {},
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating project:", error)
      return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
    }

    return NextResponse.json({ project }, { status: 201 })
  } catch (error) {
    console.error("Projects POST error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
