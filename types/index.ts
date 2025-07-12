export interface Door {
  week: number
  opened: boolean
  title: string
  text: string
}

export interface ApiResponse {
  success: boolean
  door?: Door
  doors?: Door[]
  message?: string
  action?: string
}

export interface AuthResponse {
  success: boolean
  token?: string
  message?: string
}
