var rp = {
  get: function (path) {
    var op = path.indexOf('?') === -1 ? '?' : '&'
    // var base = 'https://api.racepass.com/'
    var base = 'http://localhost:3000/'
    var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiIyZDQ5Y2ZkZi1lYTNlLTRkNTItYWU2OC0xMGJlNDU1NDA0OTgiLCJtZXRhIjp7ImNyZWF0ZWQiOiIyMDE3LTA0LTA4VDA4OjQ2OjAwLjM5M1oiLCJ1cGRhdGVkIjoiMjAxNy0wNS0xMlQwMDowNTo0NC44NTdaIn0sImVtYWlsIjoidGg0MDE5QGdtYWlsLmNvbSIsInBob25lIjoiKDEyMykgMTIzLTEyMzEiLCJyb2xlcyI6WyJBZG1pbiIsIkFjdGl2ZVBhc3MiXSwiZ2VuZGVyIjoibWFsZSIsImFkZHJlc3MiOnsiemlwIjoiODQxMDMiLCJjaXR5IjoiU2FsdCBMYWtlIENpdHkiLCJsaW5lMSI6IjczNiBOIFN1bnJpc2UgQXZlbnVlIiwic3RhdGUiOiIgVXRhaCIsImNvb3JkaW5hdGVzIjp7ImxhdCI6NDAuNzg2Mjc4NywibG5nIjotMTExLjg2Nzg2NjN9fSwicGFzc1R5cGUiOiIzcmFjZXMiLCJwYXNzd29yZCI6IiQyYSQxMCRNbERrWkN3UUQ1UnRNR1g2OVE4eUh1QlF2NHIzbDVWRm5nUFVuN1RIb1BwRjZaVlR1ZGdEQyIsInJhY2VpbmZvIjp7InRzaGlydCI6Im1lZGl1bSIsImNhdGVnb3J5IjoicnVubmVyL3dhbGtlciIsImhhc19tZWRpY2FsIjpmYWxzZSwiZW1lcmdlbmN5X3Bob25lIjoiKDEyMykgMTIzLTEyMzEiLCJlbWVyZ2VuY3lfbGFzdF9uYW1lIjoiSGFuc2VuIiwiZW1lcmdlbmN5X2ZpcnN0X25hbWUiOiJCZW4iLCJlbWVyZ2VuY3lfcmVsYXRpb25zaGlwIjoiQnJvdGhlciJ9LCJsYXN0X25hbWUiOiJIYW5zZW4iLCJmaXJzdF9uYW1lIjoiVGhvbWFzIiwiZmFjZWJvb2tfaWQiOiIxMjMxMTA1MjMwMjcyNzEyIiwicGVybWlzc2lvbnMiOnsibG9nOiBlZGl0Ijp0cnVlLCJsb2c6IHZpZXciOnRydWUsInJhY2U6IGVkaXQiOnRydWUsInJhY2U6IHZpZXciOnRydWUsInJvbGU6IGVkaXQiOnRydWUsInJvbGU6IHZpZXciOnRydWUsImxlYWRzOiBlZGl0Ijp0cnVlLCJsZWFkczogdmlldyI6dHJ1ZSwibG9nOiBjcmVhdGUiOnRydWUsImxvZzogZGVsZXRlIjp0cnVlLCJ1c2VyczogZWRpdCI6dHJ1ZSwidXNlcnM6IHZpZXciOnRydWUsInZpZXcgZXJyb3JzIjp0cnVlLCJyYWNlOiBjcmVhdGUiOnRydWUsInJhY2U6IGRlbGV0ZSI6dHJ1ZSwicm9sZTogY3JlYXRlIjp0cnVlLCJyb2xlOiBkZWxldGUiOnRydWUsImxlYWRzOiBjcmVhdGUiOnRydWUsImxlYWRzOiBkZWxldGUiOnRydWUsInNjaGVtYXM6IHZpZXciOnRydWUsInVzZXJzOiBjcmVhdGUiOnRydWUsInVzZXJzOiBkZWxldGUiOnRydWUsImNvbnRhY3RzOiBlZGl0Ijp0cnVlLCJjb250YWN0czogdmlldyI6dHJ1ZSwic2V0dGluZ3M6IGVkaXQiOnRydWUsInNldHRpbmdzOiB2aWV3Ijp0cnVlLCJ1c2VyczogZWRpdCBvd24iOnRydWUsInVzZXJzOiB2aWV3IG93biI6dHJ1ZSwiY29sbGVjdGlvbjogZWRpdCI6dHJ1ZSwiY29sbGVjdGlvbjogdmlldyI6dHJ1ZSwiY29udGFjdHM6IGNyZWF0ZSI6dHJ1ZSwiY29udGFjdHM6IGRlbGV0ZSI6dHJ1ZSwicHJvbW9fY29kZTogZWRpdCI6dHJ1ZSwicHJvbW9fY29kZTogdmlldyI6dHJ1ZSwic2V0dGluZ3M6IGNyZWF0ZSI6dHJ1ZSwic2V0dGluZ3M6IGRlbGV0ZSI6dHJ1ZSwicmFjZV9zaWdudXA6IGVkaXQiOnRydWUsInJhY2Vfc2lnbnVwOiB2aWV3Ijp0cnVlLCJ1c2VyczogZGVsZXRlIG93biI6dHJ1ZSwiY29sbGVjdGlvbjogY3JlYXRlIjp0cnVlLCJjb2xsZWN0aW9uOiBkZWxldGUiOnRydWUsInByb21vX2NvZGU6IGNyZWF0ZSI6dHJ1ZSwicHJvbW9fY29kZTogZGVsZXRlIjp0cnVlLCJlbWFpbF9zaWdudXBzOiBlZGl0Ijp0cnVlLCJlbWFpbF9zaWdudXBzOiB2aWV3Ijp0cnVlLCJyYWNlX3NpZ251cDogY3JlYXRlIjp0cnVlLCJyYWNlX3NpZ251cDogZGVsZXRlIjp0cnVlLCJ1c2VyX3BheW1lbnRzOiBlZGl0Ijp0cnVlLCJ1c2VyX3BheW1lbnRzOiB2aWV3Ijp0cnVlLCJ1c2VyczogbW9kaWZ5IHJvbGVzIjp0cnVlLCJlbWFpbF9zaWdudXBzOiBjcmVhdGUiOnRydWUsImVtYWlsX3NpZ251cHM6IGRlbGV0ZSI6dHJ1ZSwicmFjZV9zaWdudXA6IGVkaXQgb3duIjp0cnVlLCJyYWNlX3NpZ251cDogdmlldyBvd24iOnRydWUsInVzZXJfcGF5bWVudHM6IGNyZWF0ZSI6dHJ1ZSwidXNlcl9wYXltZW50czogZGVsZXRlIjp0cnVlLCJwYXJ0bmVyX3BheW1lbnRzOiBlZGl0Ijp0cnVlLCJwYXJ0bmVyX3BheW1lbnRzOiB2aWV3Ijp0cnVlLCJyYWNlX3NpZ251cDogZGVsZXRlIG93biI6dHJ1ZSwicGFydG5lcl9wYXltZW50czogY3JlYXRlIjp0cnVlLCJwYXJ0bmVyX3BheW1lbnRzOiBkZWxldGUiOnRydWUsImNvbGxlY3Rpb246IHZpZXcgcmVsZXZhbnQiOnRydWUsInVzZXJzOiB2aWV3IGhhc2hlZCBwYXNzd29yZHMiOnRydWV9LCJyYWNlX2NyZWRpdHMiOjksImRhdGVfb2ZfYmlydGgiOiIxOTkxLTExLTA1VDAwOjAwOjAwLjAwMFoiLCJwYXltZW50U2tpcHBlZCI6dHJ1ZSwidHJhbnNhY3Rpb25faWQiOiIwNzU3YWhlbSIsImlhdCI6MTQ5NTk1NDc1Nn0.yjbZWqcB3jRUP-Gmw6xNrFONxBx4sEgGKESojLggWeM'
    return fetch(base + path + op + 'token=' + token)
      .then(function (response) {
        return response.json()
      })
  },
  post: function (path, data) {
    var base = 'http://localhost:3000/'
    var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiIwOWYyYjA4MC01ZmJlLTRhZTUtOWNmNC1iNGMzNmY3YTVlMjUiLCJtZXRhIjp7ImNyZWF0ZWQiOiIyMDE3LTAzLTIyVDA2OjEwOjAxLjk5MFoiLCJ1cGRhdGVkIjoiMjAxNy0wNS0zMFQwODowNTozOC4zNzVaIn0sImVtYWlsIjoidGg0MDE5QGdtYWlsLmNvbSIsInBob25lIjoiKDEyMykgMTIzLTEyMzEiLCJyb2xlcyI6WyJBY3RpdmVQYXNzIiwiQWRtaW4iXSwiZ2VuZGVyIjoibWFsZSIsImFkZHJlc3MiOnsiemlwIjoiOTQzMDMiLCJjaXR5IjoiRWFzdCBQYWxvIEFsdG8iLCJsaW5lMSI6IjUwIEJ1Y2hhbmFuIEN0Iiwic3RhdGUiOiJDQSIsImNvb3JkaW5hdGVzIjp7ImxhdCI6MzcuNDY5MjMxNywibG5nIjotMTIyLjEzMzI2OTV9fSwicGFzc1R5cGUiOiIzcmFjZXMiLCJwYXNzd29yZCI6IiQyYSQxMCRMSUl2VHN6WUhFY0lORjExSmRPbm4uenBNdnNWYlA2MWxtSjF4M0JhRXJRY1puWE9kM0pFdSIsInJhY2VpbmZvIjp7InRzaGlydCI6InhzbWFsbCIsImNhdGVnb3J5IjoicnVubmVyL3dhbGtlciIsImhhc19tZWRpY2FsIjpmYWxzZSwiZW1lcmdlbmN5X3Bob25lIjoiKDIzIiwiZW1lcmdlbmN5X2xhc3RfbmFtZSI6IjEyMyIsImVtZXJnZW5jeV9maXJzdF9uYW1lIjoiMTIzIiwiZW1lcmdlbmN5X3JlbGF0aW9uc2hpcCI6IjEyMzEifSwibGFzdF9uYW1lIjoiSGFuc2VuIiwiZmlyc3RfbmFtZSI6IlRvbSIsImZhY2Vib29rX2lkIjoiMTIzMTEwNTIzMDI3MjcxMiIsInJhY2VfY3JlZGl0cyI6MCwiZGF0ZV9vZl9iaXJ0aCI6IjE5OTEtMTEtMDVUMDU6MDA6MDAuMDAwWiIsInBheW1lbnRTa2lwcGVkIjp0cnVlLCJ0cmFuc2FjdGlvbl9pZCI6Ims3czMxd2JoIiwiaWF0IjoxNDk2MTMzNTMwfQ.aSqnwsJ3DzcYqRqZ3jdYWFFZh_ybb9VUT96lH0CUN6Y'
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
    '5races': 295,
    'unlimited': 695,
  },
  passNames: {
    'freeTrial': 'Free Trial',
    '3races': 'Contender',
    '5races': 'Athlete',
    'unlimited': 'Pro',
  },
  passRaceCount: {
    'freeTrial': 0,
    '3races': 3,
    '5races': 5,
    'unlimited': 200,
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
