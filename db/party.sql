SELECT
  parties.name,
  candidates.first_name,
  candidates.last_name
FROM
  parties
  LEFT JOIN candidates ON candidates.party_id = parties.id;