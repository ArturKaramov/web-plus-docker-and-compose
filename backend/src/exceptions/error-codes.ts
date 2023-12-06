import { HttpStatus } from '@nestjs/common';

export enum ErrorCode {
  LoginOrPasswordIncorrect = '400_Auth',
  UserOwnWish = '400_Offer',
  TooMuchMoney = '400_Amount',
  UserAlreadyExists = 409,
  UserNotFound = '404_User',
  WishNotFound = '404_Wish',
  WishlistNotFound = '404_Wishlist',
  OfferNotFound = '404_Offer',
  Forbidden = 403,
}

export const code2message = new Map<ErrorCode, string>([
  [ErrorCode.LoginOrPasswordIncorrect, 'Login or password is incorrect'],
  [ErrorCode.UserOwnWish, "It's Not Possible To Give Money For Your Own Wish"],
  [
    ErrorCode.TooMuchMoney,
    "It's Not Possible To Give More Money Then Is Left To Finish The Wish",
  ],
  [ErrorCode.UserAlreadyExists, 'User already exists'],
  [ErrorCode.UserNotFound, 'User Not Found'],
  [ErrorCode.WishNotFound, 'Wish Not Found'],
  [ErrorCode.WishlistNotFound, 'Wishlist Not Found'],
  [ErrorCode.OfferNotFound, 'Offer Not Found'],
  [ErrorCode.Forbidden, 'No Permission For Request'],
]);

export const code2status = new Map<ErrorCode, HttpStatus>([
  [ErrorCode.LoginOrPasswordIncorrect, HttpStatus.BAD_REQUEST],
  [ErrorCode.UserOwnWish, HttpStatus.BAD_REQUEST],
  [ErrorCode.TooMuchMoney, HttpStatus.BAD_REQUEST],
  [ErrorCode.UserAlreadyExists, HttpStatus.CONFLICT],
  [ErrorCode.UserNotFound, HttpStatus.NOT_FOUND],
  [ErrorCode.WishNotFound, HttpStatus.NOT_FOUND],
  [ErrorCode.WishlistNotFound, HttpStatus.NOT_FOUND],
  [ErrorCode.OfferNotFound, HttpStatus.NOT_FOUND],
  [ErrorCode.Forbidden, HttpStatus.FORBIDDEN],
]);
