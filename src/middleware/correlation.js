import uuidv4 from 'uuid/v4';
import correlator from 'correlation-id';

export default function correlation(options) {
  const headerName = (options && options.header) || 'correlation-id';
  return (req, res, next) => {
    req.correlationId = correlator.getId;
    let id = req.get(headerName);
    if (!id) {
      id = uuidv4();
    }
    res.set(headerName, id);
    correlator.withId(id, next);
  };
}
