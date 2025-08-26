function buildJobsFilter(query) {
      const filter = {};

  if (query.status) filter.status = query.status;
   // Partial/case-insensitive match for company
  if (query.company) filter.company = { $regex: query.company, $options: "i" };
  if (query.position) filter.position = { $regex: query.position, $options: "i" };

  return filter;
}

module.exports = { buildJobsFilter };
