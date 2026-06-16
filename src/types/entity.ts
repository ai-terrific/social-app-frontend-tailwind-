interface EntityId {
  id?: number
  _id: string
}

interface Entity extends EntityId {
  createdAt: Date
  updatedAt: Date
}

export default Entity
