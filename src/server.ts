const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const axios = require('axios');
const lodash = require('lodash');
import { processData, getQueriedBlogs } from './service';

async function fetchAnalytics (): Promise<any> {
    try {
        const response: any = await axios.get('https://intent-kit-16.hasura.app/api/rest/blogs', {
            headers: {
                'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6'
            }
        });
        const data: Array<any> = response.data.blogs;
        const finalResponse: Array<any> = processData(data);
        return finalResponse;
    } catch(err) {
        console.log('Error encountered while fetching data');
        throw err;
    }
}

function statsCacheResolver(req: any): string {
    return JSON.stringify(req.query);
}
const memoizedFetchAnalytics = lodash.memoize(fetchAnalytics, statsCacheResolver, 180000);

app.get('/api/blog-stats', async (req: any, res: any) => {
    try {
        const finalResponse: Array<any> = await memoizedFetchAnalytics(req);
        res.json(finalResponse);
    } catch(err) {
        res.status(500).json({
            error: 'internal server error'
        });
    }
})

async function searchQuery(req: any): Promise<any> {
    try {
        const response: any = await axios.get('https://intent-kit-16.hasura.app/api/rest/blogs', {
            headers: {
                'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6'
            }
        });
        const blogs = response.data.blogs;
        if (req.query.query !== undefined && req.query.query !== '') {
            const title: string = lodash.toLower(req.query.query);
            const filteredBlogs: Array<any> = getQueriedBlogs(blogs, title);
            return filteredBlogs;   
        } else {
            return blogs;
        }
    } catch(err) {
        console.log('Error encountered while filtering');
        throw err;
    }
}

function searchCacheResolver(req: any): string {
    return JSON.stringify(req.query);
}

const memoizedSearchQuery = lodash.memoize(searchQuery, searchCacheResolver, 180000);

app.get('/api/blog-search', async(req: any, res: any) => {
    try {
        const response = await memoizedSearchQuery(req);
        res.json(response);
    } catch(err) {
        console.log(`Encountered exception at /api/blog-seach: ${err}`);
        res.status(500).json({
            "error": "internal server error"
        });
    }
})

app.get('/', (req: any, res: any) => {
    res.send('Server active');
})

app.listen(port, () => {
    console.log(`Server running at https://localhost:${port}`);
})