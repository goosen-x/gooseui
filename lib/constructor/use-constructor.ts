"use client"

import * as React from "react"
import { getDefaultVariant, sectionsRegistry } from "./sections-registry"
import type {
  ConstructorAction,
  ConstructorState,
  SectionConfig,
  SectionType,
  ViewportSize,
} from "./types"

function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}

function createSection(type: SectionType, variant?: string): SectionConfig {
  return {
    id: generateId(),
    type,
    variant: variant || getDefaultVariant(type),
    isRequired: sectionsRegistry[type].isRequired,
  }
}

const initialSections: SectionConfig[] = [
  createSection("header"),
  createSection("hero"),
  createSection("footer"),
]

const initialState: ConstructorState = {
  sections: initialSections,
  viewport: "desktop",
  selectedSectionId: null,
}

function constructorReducer(
  state: ConstructorState,
  action: ConstructorAction,
): ConstructorState {
  switch (action.type) {
    case "ADD_SECTION": {
      const { type, variant } = action.payload
      const newSection = createSection(type, variant)

      // Find the position to insert (before footer if exists)
      const footerIndex = state.sections.findIndex((s) => s.type === "footer")
      const insertIndex =
        footerIndex !== -1 ? footerIndex : state.sections.length

      const newSections = [...state.sections]
      newSections.splice(insertIndex, 0, newSection)

      return { ...state, sections: newSections }
    }

    case "REMOVE_SECTION": {
      const section = state.sections.find((s) => s.id === action.payload.id)
      // Cannot remove required sections
      if (section?.isRequired) return state

      return {
        ...state,
        sections: state.sections.filter((s) => s.id !== action.payload.id),
        selectedSectionId:
          state.selectedSectionId === action.payload.id
            ? null
            : state.selectedSectionId,
      }
    }

    case "UPDATE_VARIANT": {
      return {
        ...state,
        sections: state.sections.map((s) =>
          s.id === action.payload.id
            ? { ...s, variant: action.payload.variant }
            : s,
        ),
      }
    }

    case "REORDER_SECTIONS": {
      return { ...state, sections: action.payload.sections }
    }

    case "SET_VIEWPORT": {
      return { ...state, viewport: action.payload }
    }

    case "SELECT_SECTION": {
      return { ...state, selectedSectionId: action.payload }
    }

    case "RESET": {
      return initialState
    }

    default:
      return state
  }
}

export function useConstructor() {
  const [state, dispatch] = React.useReducer(constructorReducer, initialState)

  const addSection = React.useCallback(
    (type: SectionType, variant?: string) => {
      dispatch({
        type: "ADD_SECTION",
        payload: { type, variant: variant || getDefaultVariant(type) },
      })
    },
    [],
  )

  const removeSection = React.useCallback((id: string) => {
    dispatch({ type: "REMOVE_SECTION", payload: { id } })
  }, [])

  const updateVariant = React.useCallback((id: string, variant: string) => {
    dispatch({ type: "UPDATE_VARIANT", payload: { id, variant } })
  }, [])

  const reorderSections = React.useCallback((sections: SectionConfig[]) => {
    dispatch({ type: "REORDER_SECTIONS", payload: { sections } })
  }, [])

  const setViewport = React.useCallback((viewport: ViewportSize) => {
    dispatch({ type: "SET_VIEWPORT", payload: viewport })
  }, [])

  const selectSection = React.useCallback((id: string | null) => {
    dispatch({ type: "SELECT_SECTION", payload: id })
  }, [])

  const reset = React.useCallback(() => {
    dispatch({ type: "RESET" })
  }, [])

  // Generate preview URL with all sections
  const previewUrl = React.useMemo(() => {
    const params = state.sections.map((s) => s.variant).join(",")
    return `/constructor/preview?sections=${params}`
  }, [state.sections])

  return {
    ...state,
    addSection,
    removeSection,
    updateVariant,
    reorderSections,
    setViewport,
    selectSection,
    reset,
    previewUrl,
  }
}

export type UseConstructorReturn = ReturnType<typeof useConstructor>
