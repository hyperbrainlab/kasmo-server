import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

import {
  Categories,
  JobListingsSubCategories,
  UsedGoodsSubCategories,
  RealEstateSubCategories,
  BusinessDirectorySubCategories,
  PickupMovingSubCategories,
  MeetingsSubCategories,
  CurrencyExchangeSubCategories,
  BusinessMeetingsSubCategories,
} from '../modules/post/constants';

@ValidatorConstraint({ async: false })
export class IsValidSubCategoryConstraint
  implements ValidatorConstraintInterface
{
  validate(subCategory: any, args: ValidationArguments) {
    const object = args.object as any;
    switch (object.category) {
      case Categories.JOB_LISTINGS:
        return Object.values(JobListingsSubCategories).includes(subCategory);
      case Categories.USED_GOODS:
        return Object.values(UsedGoodsSubCategories).includes(subCategory);
      case Categories.REAL_ESTATE:
        return Object.values(RealEstateSubCategories).includes(subCategory);
      case Categories.BUSINESS_DIRECTORY:
        return Object.values(BusinessDirectorySubCategories).includes(
          subCategory,
        );
      case Categories.PICKUP_MOVING:
        return Object.values(PickupMovingSubCategories).includes(subCategory);
      case Categories.MEETINGS:
        return Object.values(MeetingsSubCategories).includes(subCategory);
      case Categories.CURRENCY_EXCHANGE:
        return Object.values(CurrencyExchangeSubCategories).includes(
          subCategory,
        );
      case Categories.BUSINESS_MEETINGS:
        return Object.values(BusinessMeetingsSubCategories).includes(
          subCategory,
        );
      default:
        return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    const object = args.object as any;
    return `Invalid subCategory for category ${object.category}`;
  }
}

export function IsValidSubCategory(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidSubCategoryConstraint,
    });
  };
}
