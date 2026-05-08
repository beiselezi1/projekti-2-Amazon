import {Product} from '../../data/products.js'
import { Clothing } from '../../data/products.js'
import { Appliance } from '../../data/products.js'

describe('Test Suite: products.js', () => {

  describe('class Product', () => {
    let productDetails;
    let product;
    beforeEach(() => {
      productDetails = {
        id: 'abc',
        image: '123.png',
        name: 'clock',
        rating: {
          stars: 4.5
        },
        priceCents:100
      }

      product = new Product(productDetails);
    })

    it('constructs a new object', () => {
      expect(product.id).toEqual('abc');
      expect(product.image).toEqual('123.png');
      expect(product.name).toEqual('clock');
      expect(product.rating.stars).toEqual(4.5);
      expect(product.priceCents).toEqual(100);
    })

    it('uses getStarsUrl', () => {
      const result = product.getStarsUrl();
      expect(result).toEqual(`images/ratings/rating-45.png`);
    })

    it('returns formatted price', () => {
      const result = product.getPrice();
      expect(result).toEqual('$1.00');
    })

    it('returns empty string by default', () => {
      const result = product.extraInfoHtml();
      expect(result).toEqual('');
    })
  })

  describe('class Clothing', () => {
    let clothingDetails;
    let clothing;
    beforeEach(() => {
      clothingDetails = {
        id: 'abc',
        image: '123.png',
        name: 'clock',
        rating: {
          stars: 4.5
        },
        priceCents:100,
        sizeChartLink: '12alpha'
      }

      clothing = new Clothing(clothingDetails);
    })

    it('constructs a new object', () => {
      const result = clothing.sizeChartLink;
      expect(result).toEqual('12alpha');
    });

    it('returns link as string', () => {
      const result = clothing.extraInfoHtml();
      expect(result).toContain('Size Chart');
    })
  })

  describe('class Appliance', () => {
    let applianceDetails;
    let appliance;
    beforeEach(() => {
      applianceDetails = {
        id: 'abc',
        image: '123.png',
        name: 'clock',
        rating: {
          stars: 4.5
        },
        priceCents:100,
        instructionsLink: 'a1b2',
        warrantyLink: '019b'
      }

      appliance = new Appliance(applianceDetails);
    })

    it('constructs a new object', () => {
      expect(appliance.instructionsLink).toEqual('a1b2');

      expect(appliance.warrantyLink).toEqual('019b');
    });

    it('returns link as string', () => {
      const result = appliance.extraInfoHtml();
      expect(result).toContain('Instructions');
      expect(result).toContain('Warranty');
    })
  })
})



