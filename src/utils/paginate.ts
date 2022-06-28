function paginate(data: unknown, currentPage = 1, totalCount = 0, limit = 20) {
  return {
    data,
    currentPage,
    totalCount,
    totalPage: Math.ceil(totalCount / limit),
    limit,
  }
}

export default paginate
