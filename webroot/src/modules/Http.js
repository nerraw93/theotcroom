import axios from 'axios';
import { merge } from 'lodash';

export default class Http
{
    constructor()
    {
        this.headers = {};
        this.token = '';
        this.baseURL = `${process.env.REACT_APP_API_HOST}`;

        this.driver = axios.create({
            headers: {
                'Authorization': `Bearer ${this.token}`,
            }
        });
    }

    /**
     * Set user token
     * @param {[string]} token
     */
    setToken(token)
    {
        this.token = token;
    }

    /**
     * Post
     *
     * @param   {String} url                                the url where to post in
     * @param   {Object} data                               the data to post
     * @param   {Object} [config={}]                        the custom settings for the post request
     * @return  {Promise}
     * @author  {goper}
     */
    post(url, data = {})
    {
        this.interceptor();
        return new Promise((resolve, reject) => {
            this.driver.post(`${this.baseURL}/${url}`, data, {responseType: 'json'})
                .then(xhr => resolve(xhr))
                .catch(error => reject(error.response));
        });
    }

    /**
     * Get
     *
     * @param   {String} url                                the url where to request
     * @param   {Object} data                               the data to attach to the request
     * @param   {Object} [config={}]                        the custom settings for the post request
     * @return  {Promise}
     * @author  {goper}
     */
    get(url, data = {})
    {
        this.interceptor();
        return new Promise((resolve, reject) => {
            this.driver.get(`${this.baseURL}/${url}`, merge({responseType: 'json'}, {params: data}))
                .then(xhr => resolve(xhr))
                .catch(error => reject(error.response));
        });
    }

    /**
     * Axios interceptor - update headers - fix for 401 error without `refresh`
     * @return {void}
     */
    interceptor()
    {
        this.driver.interceptors.request.use((config) => {
            config.headers['Authorization'] = `Bearer ${this.token}`;
            return config
        }, (error) => {
            return Promise.reject(error)
        });
    }
}
