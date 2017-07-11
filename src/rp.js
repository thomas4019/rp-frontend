var rp = {
  mode: 'prod',
  get: function (path) {
    var op = path.indexOf('?') === -1 ? '?' : '&'
    var base = (this.mode === 'dev' ? 'http://localhost:3000/' : 'https://api.racepass.com/')
    var token = localStorage.token
    return fetch(base + path + op + 'token=' + token)
      .then(function (response) {
        var contentType = response.headers.get('content-type')
        if (contentType && contentType.indexOf('application/json') !== -1) {
          return response.json()
        } else {
          return response.text()
        }
      })
  },
  getExternal: function (path) {
    return fetch(path)
      .then(function (response) {
        var contentType = response.headers.get('content-type')
        if (contentType && contentType.indexOf('application/json') !== -1) {
          return response.json()
        } else {
          return response.text()
        }
      })
  },
  post: function (path, data) {
    var base = (this.mode === 'dev' ? 'http://localhost:3000/' : 'https://api.racepass.com/')
    var token = localStorage.token
    return fetch(base + path + '?token=' + token, {
      method: 'POST',
      body: JSON.stringify(data),
    })
    .then(function (response) {
      return path.indexOf('/update') === -1 ? response.json() : response.text()
    })
  },
  passPrices: {
    'freeTrial': 0,
    '3races': 195,
    '5races': 365,
    '12races': 645,
    'unlimited': 695
  },
  passNames: {
    'freeTrial': 'Free Trial',
    '3races': 'Contender',
    '5races': 'Athlete',
    '12races': 'Pro',
    'unlimited': 'Pro',
  },
  passRaceCount: {
    'freeTrial': 0,
    '3races': 3,
    '5races': 6,
    '12races': 12,
    'unlimited': 200
  },
  distanceMap: {
    'Half Marathon': 21.09,
    'Marathon': 42.19,
    'Fun Run': 1,
  },
  formatRaceDistance: function (dist) {
    for (var name in rp.distanceMap) {
      if (Math.abs(rp.distanceMap[name] - dist) < 0.1) {
        return name
      }
    }
    if (dist) {
      return dist + 'K'
    }
    return ''
  },
  getQueryVariable: function (variable) {
    var query = window.location.search.substring(1)
    var vars = query.split('&')
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=')
      if (decodeURIComponent(pair[0]) === variable) {
        return decodeURIComponent(pair[1])
      }
    }
    console.log('Query variable %s not found', variable)
  },
  pseudoRandom: function (race, o) {
    var str = race.name + race.type
    var hash = 0
    if (str.length === 0) return hash
    for (var i = 0; i < str.length; i++) {
      var char = str.charCodeAt(i)
      hash = hash * o + char
      hash = hash & hash // Convert to 32bit integer
    }
    return (hash / 1000 % 1)
  },
  combinedSearch: function (queryText, callback) {
    var service = null // new google.maps.places.AutocompleteService()

    var request = {
      types: ['(regions)'],
      components: 'country:us',
      radius: 5000,
      query: queryText
    }
    if (window.map) {
      request['location'] = window.map.getCenter()
    }
    var combined = []

    var returnedCount = 0

    if (!queryText) {
      return callback([])
    }

    service.getPlacePredictions({
      input: queryText,
      types: ['(regions)'],
      componentRestrictions: {
        country: 'us'
      }
    }, function (data) {
      data = data || []
      var places = data.map(function (r) {
        console.log(r)
        return {
          'type': 'place',
          'place_id': r.place_id,
          'name': r.description,
        }
      })
      combined = combined.concat(places)
      returnedCount++
      if (returnedCount >= 2) {
        callback(combined)
      }
    })

    var query = {'$and': [
      {'status': 'visible'}
    ]}
    queryText.split(' ').forEach(function (word) {
      query['$and'].push({'name': {'$regex': word, '$options': 'i'}})
    })
    rp.get('race?limit=5&query=' + JSON.stringify(query))
      .then(function (data) {
        var races = data.map(function (r) {
          return {
            'type': 'race',
            'location': r.location.coordinates,
            'name': r.name,
            'race': r,
          }
        })
        combined = combined.concat(races)
        returnedCount++
        if (returnedCount >= 2) {
          callback(combined)
        }
      })
  },
  calculateAge: function (birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime()
    var ageDate = new Date(ageDifMs) // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970)
  }
}
export default rp
