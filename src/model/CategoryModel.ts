export interface CategoryModel {
  id: number
  name: string
}

// // Chọn những trường mà bạn muốn bao gồm trong phiên bản mới
// export type CustomCategory = Pick<Category, 'id' | 'name' | 'description'>;

// // Sử dụng CustomCategory khi cần
// const customCategory: CustomCategory = {
//   id: 1,
//   name: 'Custom Name',
//   description: 'Custom Description',
// };

// // Tất cả các trường trong CustomCategory đều trở thành tùy chọn
// export type PartialCategory = Partial<Category>;

// // Sử dụng PartialCategory khi cần
// const partialCategory: PartialCategory = {
//   id: 1,
//   name: 'Partial Name',
// };
