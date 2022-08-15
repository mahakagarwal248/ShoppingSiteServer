import AppError from './AppError.js';

export default (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req, { allowUnknown: true });

    const valid = error == null;

    if (!valid) {
      const { details } = error;
      const message = details.map((i) => i.message.replace(/body.|headers.|query./, '')).join('');
      return next(new AppError(message, 400));
    } else {
      return next();
    }
  };
};
