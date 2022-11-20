export function groupBy(tableauObjets, propriete) {
  return tableauObjets.reduce(function (acc, obj) {
    let cle = obj[propriete]
    if (!acc[cle]) {
      acc[cle] = []
    }
    acc[cle].push(obj)
    return acc
  }, {})
}
