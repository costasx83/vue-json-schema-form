/**
 * Created by Liu.Jun on 2019/9/29 18:58.
 */

// Carousel image
import componentPackCarouselImg from '../viewComponents/CarouselImg';

// Flash sale products
import componentPackFlashSaleGoodsList from '../viewComponents/FlashSaleGoodsList';

// Plain text
import componentPackText from '../viewComponents/Text';

// Multiple images module - 5 in a row
import componentPackMultipleImg5 from '../viewComponents/MultipleImg5';

// Multiple images module 2-3
import componentPackMultipleImg23 from '../viewComponents/MultipleImg2_3';

// Multiple images module 1-2
import componentPackMultipleImg13 from '../viewComponents/MultipleImg1_3';

// Category district
import componentPackCategoryGoods from '../viewComponents/CategoryGoods';

// Recommended
import componentPackRecommendedGoodsList from '../viewComponents/RecommendedGoodsList';

// All products
import componentPackAllGoodsList from '../viewComponents/AllGoodsList';

// Coupon
import componentPackCoupon from '../viewComponents/Coupon';


/**
 * hidden - Hidden, not displayed in toolbar
 * maxNum Number - Maximum configurable count
 * topDisplay Bool - Display at the top
 * bottomDisplay Bool - Display at the bottom
 * onlyCanConfig Bool - Can only configure data, cannot delete or copy
 * @type {*[]}
 */
const tools = [
    {
        groupName: 'Image & Text',
        componentList: [{
            title: 'Carousel (Normal Array)',
            maxNum: 2,
            viewWidth: '1920px',
            icon: 'el-icon-picture',
            name: 'CarouselImg',
            componentPack: componentPackCarouselImg
        }, {
            title: 'Flash Sale Products',
            maxNum: 3,
            icon: 'el-icon-picture',
            name: 'FlashSaleGoodsList',
            componentPack: componentPackFlashSaleGoodsList
        }, {
            title: 'Multiple Images (5)',
            maxNum: 5,
            icon: 'el-icon-picture',
            name: 'MultipleImg5',
            componentPack: componentPackMultipleImg5
        }, {
            title: 'Multiple Images (2-3)',
            maxNum: 10,
            icon: 'el-icon-s-grid',
            name: 'MultipleImg2_3',
            componentPack: componentPackMultipleImg23
        }, {
            title: 'Multiple Images (1-3)',
            maxNum: 10,
            icon: 'el-icon-s-grid',
            name: 'MultipleImg1_3',
            componentPack: componentPackMultipleImg13
        }, {
            title: 'Category District',
            maxNum: 10,
            icon: 'el-icon-s-grid',
            name: 'CategoryGoods',
            componentPack: componentPackCategoryGoods
        }, {
            title: 'Plain Text',
            maxNum: 20,
            icon: 'el-icon-notebook-1',
            name: 'Text',
            componentPack: componentPackText
        }]
    },
    {
        groupName: 'Products',
        componentList: [{
            title: 'All Products',
            maxNum: 1,
            icon: 'el-icon-s-goods',
            componentPack: componentPackAllGoodsList,
            name: 'AllGoodsList',
            additional: {
                bottomDisplay: true,
                unRemove: true // Cannot be removed
            }
        }, {
            title: 'Recommended Products',
            maxNum: 1,
            icon: 'el-icon-s-goods',
            name: 'RecommendedGoodsList',
            componentPack: componentPackRecommendedGoodsList
        }]
    },
    {
        groupName: 'Marketing & Interaction',
        componentList: [{
            title: 'Coupon',
            maxNum: 1,
            icon: 'el-icon-s-ticket',
            name: 'Coupon',
            componentPack: componentPackCoupon
        }]
    }
];

export default tools;
