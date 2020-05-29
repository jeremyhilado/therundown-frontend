import axios from 'axios'

const api = axios.create({
    baseURL: 'https://jeremyh-yelp-clone.herokuapp.com/'
})

export const login = async (user) => {
    try {
        const res = await api.post('/auth/users/login/', user)
        return res
    }
    catch (err) {
        console.log(err)
        return err
    }
}

export const register = async (user) => {
    try {
        const res = await api.post('/auth/users/register/', user)
        return res
    }
    catch (err) {
        console.log(err.response.data)
        return err
    }
}

export const getBusinesses = async (token) => {
    try {
        const res = await api.get('/api/businesses/', {
            headers: {
                authorization: 'JWT ' + token
            }
        })
        return res
    }
    catch (err) {
        console.log(err)
        return err
    }
}

export const createBusiness = async(business, token) => {
    try {
        const res = await api.post('/api/businesses/', business, {
            headers: {
                authorization: 'JWT ' + token
            }
        })
        return res
    }
    catch (err) {
        console.log(err)
        return err
    }
}

export const updateBusiness = async(id, business, token) => {
    try {
        const res = await api.patch(`/api/businesses/${id}/`, business, {
            headers: {
                authorization: 'JWT ' + token
            }
        })
        return res
    }
    catch (err) {
        console.log(err)
        return err
    }
}

export const deleteBusiness = async (id, token) => {
    try {
        const res = await api.delete(`/api/businesses/${id}/`, {
            headers: {
                authorization: 'JWT ' + token
            }
        })
        return res
    }
    catch (err) {
        console.log(err)
        return err
    }
}

export const getReviews = async (token) => {
    try {
        const res = await api.get('/api/reviews/', {
            headers: {
                authorization: 'JWT ' + token 
            }
        })
        return res
    }
    catch (err) {
        console.log(err)
        return err
    }
}

export const createReview = async (review, token) => {
    try {
        const res = await api.post('/api/reviews/', review, {
            headers: {
                authorization: 'JWT ' + token
            }
        })
        return res
    }
    catch (err) {
        console.log(err)
        return err
    }
}

export const updateReview = async (id, review, token) => {
    try {
        const res = await api.patch(`/api/reviews/${id}/`, {
            headers: {
                authorization: 'JWT ' + token
            }
        })
        return res
    }
    catch (err) {
        console.log(err)
        return err
    }
}

export const deleteReview = async (id, token) => {
    try {
        const res = await api.delete(`/api/reviews/${id}/`, {
            headers: {
                authorization: 'JWT ' + token
            }
        })
        return res
    }
    catch (err) {
        console.log(err)
        return err
    }
}

export const getImages = async (token) => {
    try {
        const res = await api.get('/api/images/', {
            headers: {
                authorization: 'JWT ' + token
            }
        })
        return res
    }
    catch (err) {
        console.log(err)
        return err
    }
}

export const createImage = async (image, token) => {
    try {
        const res = await api.post('/api/images/', {
            headers: {
                authorization: 'JWT ' + token
            }
        })
        return res
    }
    catch (err) {
        console.log(err)
        return err
    }
}

export const updateImage = async (id, image, token) => {
    try {
        const res = await api.patch(`/api/images/${id}/`, {
            headers: {
                authorization: 'JWT ' + token
            }
        })
        return res
    }
    catch (err) {
        console.log(err)
        return err
    }
}

export const deleteImage = async (id, token) => {
    try {
        const res = await api.delete(`/api/images/${id}/`, {
            headers: {
                authorization: 'JWT ' + token
            }
        })
        return res
    }
    catch (err) {
        console.log(err)
        return err
    }
}