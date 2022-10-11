export const CATEGORY_QUERY = `
    query Categories {
      categories {
        name
      }
      currencies {
        label
        symbol
      }
    }
`

export const ALL_PRODUCT_QUERY = `
query Category {
  category {
    name
    products {
      name
      id
      inStock
      category
      gallery
      prices {
        amount
        currency {
          label
          symbol
        }
      }
    }
  }
}
`

export const SINGLE_PRODUCT_QUERY = `
query Query($productId: String!) {
  product(id: $productId) {
    id
    name
    inStock
    gallery
    description
    category
    attributes {
      id
      name
      type
      items {
        displayValue
        value
        id
      }
    }
    prices {
      currency {
        label
        symbol
      }
      amount
    }
    brand
  }
}
`
export const LOAD_ITEMS = `
query Category($input:CategoryInput) {
  category(input: $input) {
    name
    products {
      name
      id
      inStock
      category
      gallery
      prices {
        amount
        currency {
          label
          symbol
        }
      }
    }
  }
}
`