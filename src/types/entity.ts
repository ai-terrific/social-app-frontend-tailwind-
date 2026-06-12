interface EntityId {
  id?: number
  _id: string
}

interface Entity extends EntityId {
  createdAt: string
  updatedAt: string
}

export default Entity
