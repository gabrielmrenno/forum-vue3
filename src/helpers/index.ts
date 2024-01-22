export function findById(id: string, resources: any[]) {
  if (!resources || resources.length === 0) return null
  return resources.find((item) => item?.id === id)
}

export function upsert(resources: any[], resource: any) {
  const index = resources.findIndex((item) => item?.id === resource?.id)
  if (index !== -1) {
    resources[index] = resource
    return
  }
  resources.push(resource)
}
