export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      contratas: {
        Row: {
          aliases: string[]
          created_at: string
          fecha_fin_acuerdo: string | null
          fecha_inicio_acuerdo: string | null
          id: string
          nombre: string
          nro_acuerdo: string | null
          tipo: Database["public"]["Enums"]["contrata_tipo"] | null
        }
        Insert: {
          aliases?: string[]
          created_at?: string
          fecha_fin_acuerdo?: string | null
          fecha_inicio_acuerdo?: string | null
          id?: string
          nombre: string
          nro_acuerdo?: string | null
          tipo?: Database["public"]["Enums"]["contrata_tipo"] | null
        }
        Update: {
          aliases?: string[]
          created_at?: string
          fecha_fin_acuerdo?: string | null
          fecha_inicio_acuerdo?: string | null
          id?: string
          nombre?: string
          nro_acuerdo?: string | null
          tipo?: Database["public"]["Enums"]["contrata_tipo"] | null
        }
        Relationships: []
      }
      links: {
        Row: {
          activo: boolean
          created_at: string
          descripcion: string | null
          id: string
          nombre: string
          orden: number
          seccion: Database["public"]["Enums"]["link_seccion"]
          url: string
        }
        Insert: {
          activo?: boolean
          created_at?: string
          descripcion?: string | null
          id?: string
          nombre: string
          orden?: number
          seccion: Database["public"]["Enums"]["link_seccion"]
          url: string
        }
        Update: {
          activo?: boolean
          created_at?: string
          descripcion?: string | null
          id?: string
          nombre?: string
          orden?: number
          seccion?: Database["public"]["Enums"]["link_seccion"]
          url?: string
        }
        Relationships: []
      }
      mision_vision: {
        Row: {
          clave: Database["public"]["Enums"]["mision_vision_clave"]
          contenido: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          clave: Database["public"]["Enums"]["mision_vision_clave"]
          contenido?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          clave?: Database["public"]["Enums"]["mision_vision_clave"]
          contenido?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mision_vision_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pagos: {
        Row: {
          costo: number | null
          created_at: string
          estado_pago: Database["public"]["Enums"]["pago_estado"]
          fecha_cierre: string | null
          id: string
          lpu_recibida: boolean
          moneda: string | null
          proveedor_referencia_id: string | null
          proyecto_cierre: boolean
          sustento_lpu: string | null
          trabajo_id: string
          updated_at: string
        }
        Insert: {
          costo?: number | null
          created_at?: string
          estado_pago?: Database["public"]["Enums"]["pago_estado"]
          fecha_cierre?: string | null
          id?: string
          lpu_recibida?: boolean
          moneda?: string | null
          proveedor_referencia_id?: string | null
          proyecto_cierre?: boolean
          sustento_lpu?: string | null
          trabajo_id: string
          updated_at?: string
        }
        Update: {
          costo?: number | null
          created_at?: string
          estado_pago?: Database["public"]["Enums"]["pago_estado"]
          fecha_cierre?: string | null
          id?: string
          lpu_recibida?: boolean
          moneda?: string | null
          proveedor_referencia_id?: string | null
          proyecto_cierre?: boolean
          sustento_lpu?: string | null
          trabajo_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pagos_proveedor_referencia_id_fkey"
            columns: ["proveedor_referencia_id"]
            isOneToOne: false
            referencedRelation: "contratas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pagos_trabajo_id_fkey"
            columns: ["trabajo_id"]
            isOneToOne: true
            referencedRelation: "trabajos"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          nombre_completo: string | null
        }
        Insert: {
          created_at?: string
          id: string
          nombre_completo?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          nombre_completo?: string | null
        }
        Relationships: []
      }
      trabajos: {
        Row: {
          comentario: string | null
          contrata_id: string | null
          created_at: string
          created_by: string | null
          df: number
          enlace: string
          estado: Database["public"]["Enums"]["trabajo_estado"]
          fecha_entrega: string | null
          fecha_forecast: string | null
          fecha_real_ejecucion: string | null
          id: string
          pedido_oracle_generado: boolean
          rq: string | null
          tipo_trabajo: Database["public"]["Enums"]["trabajo_tipo"] | null
          updated_at: string
        }
        Insert: {
          comentario?: string | null
          contrata_id?: string | null
          created_at?: string
          created_by?: string | null
          df: number
          enlace: string
          estado?: Database["public"]["Enums"]["trabajo_estado"]
          fecha_entrega?: string | null
          fecha_forecast?: string | null
          fecha_real_ejecucion?: string | null
          id?: string
          pedido_oracle_generado?: boolean
          rq?: string | null
          tipo_trabajo?: Database["public"]["Enums"]["trabajo_tipo"] | null
          updated_at?: string
        }
        Update: {
          comentario?: string | null
          contrata_id?: string | null
          created_at?: string
          created_by?: string | null
          df?: number
          enlace?: string
          estado?: Database["public"]["Enums"]["trabajo_estado"]
          fecha_entrega?: string | null
          fecha_forecast?: string | null
          fecha_real_ejecucion?: string | null
          id?: string
          pedido_oracle_generado?: boolean
          rq?: string | null
          tipo_trabajo?: Database["public"]["Enums"]["trabajo_tipo"] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "trabajos_contrata_id_fkey"
            columns: ["contrata_id"]
            isOneToOne: false
            referencedRelation: "contratas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trabajos_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      validadores_semana: {
        Row: {
          area: Database["public"]["Enums"]["validador_area"]
          persona: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          area: Database["public"]["Enums"]["validador_area"]
          persona?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          area?: Database["public"]["Enums"]["validador_area"]
          persona?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "validadores_semana_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      zona_asignaciones: {
        Row: {
          contrata_id: string | null
          coordinador_id: string | null
          created_at: string
          created_by: string | null
          departamento: string
          id: string
          tipo_trabajo: Database["public"]["Enums"]["zona_tipo_trabajo"]
        }
        Insert: {
          contrata_id?: string | null
          coordinador_id?: string | null
          created_at?: string
          created_by?: string | null
          departamento: string
          id?: string
          tipo_trabajo: Database["public"]["Enums"]["zona_tipo_trabajo"]
        }
        Update: {
          contrata_id?: string | null
          coordinador_id?: string | null
          created_at?: string
          created_by?: string | null
          departamento?: string
          id?: string
          tipo_trabajo?: Database["public"]["Enums"]["zona_tipo_trabajo"]
        }
        Relationships: [
          {
            foreignKeyName: "zona_asignaciones_contrata_id_fkey"
            columns: ["contrata_id"]
            isOneToOne: false
            referencedRelation: "contratas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "zona_asignaciones_coordinador_id_fkey"
            columns: ["coordinador_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "zona_asignaciones_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      v_alertas: {
        Row: {
          df: number | null
          dias: number | null
          enlace: string | null
          tipo_alerta: string | null
          trabajo_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_dashboard_kpis: { Args: never; Returns: Json }
    }
    Enums: {
      contrata_tipo: "FO" | "NODOS, IB Y MW"
      link_seccion: "plataformas" | "manuales"
      mision_vision_clave: "mision" | "vision"
      pago_estado: "PAGADO" | "PENDIENTE" | "NO"
      trabajo_estado: "EJECUTADO" | "STAND BY" | "NO"
      trabajo_tipo:
        | "Cableado nuevo sin afectación"
        | "Reubicaciones con afectación"
      validador_area: "PEXT" | "TX" | "N3" | "CORE IP"
      zona_tipo_trabajo:
        | "FO PINT"
        | "FO PEXT"
        | "MW"
        | "Desmontaje"
        | "CONTRATA FIJA"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      contrata_tipo: ["FO", "NODOS, IB Y MW"],
      link_seccion: ["plataformas", "manuales"],
      mision_vision_clave: ["mision", "vision"],
      pago_estado: ["PAGADO", "PENDIENTE", "NO"],
      trabajo_estado: ["EJECUTADO", "STAND BY", "NO"],
      trabajo_tipo: [
        "Cableado nuevo sin afectación",
        "Reubicaciones con afectación",
      ],
      validador_area: ["PEXT", "TX", "N3", "CORE IP"],
      zona_tipo_trabajo: [
        "FO PINT",
        "FO PEXT",
        "MW",
        "Desmontaje",
        "CONTRATA FIJA",
      ],
    },
  },
} as const
