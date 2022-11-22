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

export const diffTime = (start, end) => {
  // objectif ! difference entre 2 dates :
  // avoir une chaine de caracteres qui affiche : Days : Heures : Minutes : secondes : Milliseconde
  // algo ! on faire faire la difference en ms : calculer les jours, sourstraire, les heures + sourstraires etc ...tracker

  //1 : date de depart et date de fin (date de fin peut etre undefined = now)
  //2 : calcul delta diff /1000 pour avoir en seconde
  //3 : calcul nb days : delta/ 86400 : nombre de seconde / 86400 (seconde dans days) pour avoir le nombre de days
  //4 : calcul nb heures  :delta / 3600 : nombre de seconde restante / 3600 polur avoir le nombre d'heures restante
  //5 : calcul nb minutes  :delta / 60 : nombre de seconde restant / 60 pour avoir les minutes
  //6 : calcul nb sec  :delta / 60 : nombre de seconde restant / 60 pour avoir les minutes

  start = new Date(start)
  end = end ? new Date(end) : new Date()

  let durationStr = ''

  var delta = Math.abs(start - end) / 1000

  // calculate (and subtract) whole days
  var days = Math.floor(delta / 86400)
  delta -= days * 86400

  if (days > 0) {
    durationStr = days + ' j '
  }
  // calculate (and subtract) whole hours
  var hours = Math.floor(delta / 3600) % 24
  delta -= hours * 3600

  if (hours > 0) {
    durationStr = durationStr + hours + ' h '
  }
  // calculate (and subtract) whole minutes
  var minutes = Math.floor(delta / 60) % 60
  delta -= minutes * 60
  if (minutes > 0) {
    durationStr = durationStr + minutes + ' min '
  }
  // what's left is seconds
  var seconds = Math.floor(delta % 60)
  if (seconds > 0) {
    durationStr = durationStr + seconds + ' sec '
  }

  return durationStr
}

export const getDateTimeForPicker = (date = new Date()) => {
  const dateIso = date.toISOString()
  return dateIso.substring(0, dateIso.length - 5)
}

export function randomId() {
  return Math.random() * 999
}

export const convertTime = time => {
  return new Date(time).toLocaleDateString('fr-fr', {
    month: 'long',
    day: 'numeric',
    minute: 'numeric',
    hour: 'numeric',
  })
}
