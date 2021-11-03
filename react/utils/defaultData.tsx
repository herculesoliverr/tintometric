export const defaultJSON = {
  families: [
    {
      id: 1,
      name: 'Vermelhos e Rosas',
      color: '#ED1C24',
      productType: [1],
    },
  ],
  products: [
    {
      code: 'R560',
      name: 'Rosa Vibrante',
      slug: 'rosa-vibrante',
      family: 1,
      R: 162,
      G: 33,
      B: 95,
      skuId: 9,
      composition: {
        acotone: {
          base_p_albacryl_900: 1,
          tinter1: 8.5383375,
          tinter2: 3.770175,
          tinter3: 77.67669375,
          tinter4: 0,
          tinter5: 0,
          tinter6: 0,
          tinter7: 0,
          tinter8: 0,
          tinter9: 0,
          tinter10: 0,
          tinter11: 0,
          tinter12: 0,
          tinter13: 0,
        },
        loc: {
          base_p_albacryl_900: 1,
          tinter1: 1,
          tinter2: 0,
          tinter3: 0,
          tinter4: 0,
          tinter5: 0,
          tinter6: 0,
          tinter7: 0,
          tinter8: 0,
          tinter9: 0,
          tinter10: 0,
          tinter11: 0,
        },
      },
    },
  ],
  productType: [
    {
      id: 1,
      slug: 'tinta-alba-familia-protegida-acetinado',
    },
  ],
}

export const defaultCSV = [
  ['base', 'price'],
  ['base_p_albacryl_900', '100.25'],
  ['base_f_albacryl_900', '0.20'],
  ['base_t_albacryl_900', '100'],
]
