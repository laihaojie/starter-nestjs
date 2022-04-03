function paginate(data: unknown, currentPage: number = 1, totalCount: number = 0, limit: number = 20) {
    return {
        data,
        currentPage,
        totalCount,
        totalPage: Math.ceil(totalCount / limit),
        limit
    }
}

export default paginate