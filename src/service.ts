// service.ts
const lodash = require('lodash');

// Function to get the title of the longest blog post
function getLongestTitle(blogs: Array<any>): string {
    let title: string = '';
    let length: number = 0;
    blogs.forEach((blog: any) => {
        if (blog.title.length > length) {
            length = blog.title.length;
            title = blog.title;
        }
    });
    return title;
}

// Function to count the number of blog posts with "privacy" in their titles
function getNoTitlesWithPrivacy(blogs: Array<any>): number {
    let noBlogsPrivacy: number = 0;
    blogs.forEach((blog: any) => {
        if (lodash.includes(lodash.toLower(blog.title), 'privacy')) {
            noBlogsPrivacy++;
        }
    });
    return noBlogsPrivacy;
}

// Function to get an array of unique blog titles
function getUniqueBlogTitles(blogs: Array<any>): Array<any> {
    let uniqueArray: Array<string> = []
    const titleSet = new Set<string>();
    blogs.forEach((blog: any) => {
        const title = lodash.toLower(blog.title)
        if (!titleSet.has(title)) {
            uniqueArray.push(blog.title);
            titleSet.add(title);
        }
    })
    return uniqueArray;
}

// Function to process data and return statistics
export function processData(data: Array<any>): any {
    const longest_title: string = getLongestTitle(data);
    const titles_with_privacy: number = getNoTitlesWithPrivacy(data);
    const unique_blog_titles: Array<string> = getUniqueBlogTitles(data);
    return {
        total_blogs: data.length,
        longest_title: longest_title,
        titles_with_privacy: titles_with_privacy,
        unique_blog_titles: unique_blog_titles
    }
}

// Function to get blog posts that match a query title
export function getQueriedBlogs(blogs: Array<any>, queryTitle: string): Array<any> {
    let queriedBlogs: Array<any> = []
    blogs.forEach((blog: any) => {
        let title = lodash.toLower(blog.title);
        if (lodash.includes(title, queryTitle)) {
            queriedBlogs.push(blog)
        }
    });
    return queriedBlogs;
}
