export class RecordDto {
  /** @type {string} */
  recordType;
  /** @type {number} */
  money;
  /** @type {string} */
  account;
  /** @type {string} */
  category;
}

export class RecordModel extends RecordDto {
  /** @type {string} */
  _id;
}

/* ???
export class CategoryDto {
}

export class CategoryModel {
}

export class AccountDto {
}

export class AccountModel {
}

export class UserDto {
}

export class UserModel extend UserDto {
}
*/
