// Filtering logic example : ?company=google
function buildJobsFilter(query) {
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


module.exports = { buildJobsFilter,buildSort };
