const BASE_URL = "http://localhost:5000"

export const request = async (url, method, headers = {}, body = {}, isNotStringified = false) => {
    let res
    let data
    switch (method) {
        case 'GET':
            res = await fetch(BASE_URL + url, { headers })
            data = await res.json()
            return data

        case 'POST':
            // if we send form data, it is not content-type:application/json,
            // hence the bonus param 
            if (isNotStringified) {
                res = await fetch(BASE_URL + url, { headers, method, body })
                data = await res.json()
            } else {
                console.log("here")
                res = await fetch(BASE_URL + url, { headers, method, body: JSON.stringify({ ...body }) })
                data = await res.json()
            }
            return data

        case 'PUT':
            res = await fetch(BASE_URL + url, { headers, method, body: JSON.stringify({ ...body }) })
            data = await res.json()
            return data

        case 'DELETE':
            res = await fetch(BASE_URL + url, { headers, method })
            data = await res.json()
            return data
        default:
            return
    }
}


//The function uses the fetch() method to make HTTP requests. The fetch() method is a modern JavaScript API that makes it easy to make asynchronous HTTP requests. The fetch() method returns a promise, which is a JavaScript object that represents an asynchronous operation. The promise will be resolved with the response object when the request is completed.