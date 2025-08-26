// Filtering logic example : ?company=google
function buildFilter(query) {
  const filter = {};
  if (query.status) filter.status = query.status;
   // Partial/case-insensitive match for company
  if (query.company) filter.company = { $regex: query.company, $options: "i" };
  if (query.position) filter.position = { $regex: query.position, $options: "i" };
  return filter;
}



// Sorting Logic example : ?sort=company,-createdAt
function buildSort (sortQuery) {
  if (!sortQuery) return {};
  const ALLOWED_SORT_FIELDS = ["company", "position", "status", "createdAt", "updatedAt"];
  const sortFields = {};
  const fields = sortQuery.split(",");
  for (const field of fields) {
    const direction = field.startsWith("-") ? -1 : 1;
    const fieldName = field.startsWith("-") ? field.substring(1) : field;
    if (!ALLOWED_SORT_FIELDS.includes(fieldName)) {
      throw new Error(`Invalid sort field: ${fieldName} only tose fields are allowed : ${ALLOWED_SORT_FIELDS}`);
    }
    sortFields[fieldName] = direction;
  }
  return sortFields;
}


// Pagination with page and limit : /jobs?page=2&limit=10
function buildPagination(query) {
  const page = query.page || 1;
  const limit = query.limit || 10;
  const skip = (page - 1) * limit;

  return { page, limit, skip };
}



module.exports = { buildJobsFilter: buildFilter,buildSort ,buildPagination};
