import express from 'express';
const Router = express.Router();

import { getMe, updatePreferenes, updateProfile } from './user.controller';
import protectRoute from '../../middlewares/protectRoute';
import { validate } from '../../middlewares/validate';
import { UserPrefsDto } from './user.dto';

Router.route('/').get(protectRoute, getMe).put(updateProfile);
Router.route('/preferences').put(
  protectRoute,
  validate(UserPrefsDto),
  updatePreferenes
);

export default Router;

// Şifre sıfırla
// isim değiştir
// locale, timezone, baseCurrency değiştir
