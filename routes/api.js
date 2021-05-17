const express = require('express');
const router = express.Router();


const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

async function getFakeCaptcha(req, res) {
  await waitTime(2000);
  return res.json('captcha-xxx');
}

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;

let access = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site' ? 'admin' : '';
// access = 'site';
const getAccess = () => {
  return access;
};

router.get('/currentUser', (req, res) => {
  if (!getAccess()) {
    res.status(401).send({
      data: {
        isLogin: false,
      },
      errorCode: '401',
      errorMessage: 'please log in first!',
      success: true,
    });
    return;
  }
  res.send({
    name: 'Pawan Sharma',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    userid: '00000001',
    email: 'antdesign@alipay.com',
    signature: 'Be tolerant to diversity, tolerance is a virtue',
    title: 'Interactive expert',
    group: 'Ant Jin Service - a certain business group - a certain platform - a certain technical department－UED',
    tags: [
      {
        key: '0',
        label: 'Very idea',
      },
      {
        key: '1',
        label: 'Design',
      },
      {
        key: '2',
        label: 'Spicy ~',
      },
      {
        key: '3',
        label: 'Long legs',
      },
      {
        key: '4',
        label: 'Chuan sister',
      },
      {
        key: '5',
        label: 'Haina Baichuan',
      },
    ],
    notifyCount: 12,
    unreadCount: 11,
    country: 'India',
    access: getAccess(),
    geographic: {
      province: {
        label: 'Zhejiang Province',
        key: '330000',
      },
      city: {
        label: 'Hangzhou',
        key: '330100',
      },
    },
    address: 'No. 77, Workal Road, Xihu District',
    phone: '0752-268888888',
  });
})

router.get('/users', (res, req) => {
  res.send([
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ])
})

router.post('/login/account', async (req, res) => {
  const { password, username, type } = req.body;
    await waitTime(2000);
    if (password === '123' && username === 'pksharma') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      access = 'admin';
      return;
    }
    if (password === 'ant.design' && username === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
      });
      access = 'user';
      return;
    }
    if (type === 'mobile') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      access = 'admin';
      return;
    }

    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
    access = 'guest';
});

router.get('/login/outLogin', (req, res) => {
  access = '';
  res.send({ data: {}, success: true });
})

router.post('/register', (req, res) => {
  res.send({ status: 'ok', currentAuthority: 'user', success: true });
})

router.get('/500', (req, res) => {
  res.status(500).send({
    timestamp: 1513932555104,
    status: 500,
    error: 'error',
    message: 'error',
    path: '/base/category/list',
  });
})

router.get('/404', (req, res) => {
  res.status(404).send({
    timestamp: 1513932643431,
    status: 404,
    error: 'Not Found',
    message: 'No message available',
    path: '/base/category/list/2121212',
  });
})

router.get('/403', (req, res) => {
  res.status(403).send({
    timestamp: 1513932555104,
    status: 403,
    error: 'Unauthorized',
    message: 'Unauthorized',
    path: '/base/category/list',
  });
})

router.get('/401', (req, res) => {
  res.status(401).send({
    timestamp: 1513932555104,
    status: 401,
    error: 'Unauthorized',
    message: 'Unauthorized',
    path: '/base/category/list',
  });
})

router.get('/login/captcha', getFakeCaptcha)


router.post('/create', (req, res) => {
  console.log({ status: 'ok', data: JSON.stringify(req.body), success: true });
  res.send({ status: 'ok', data: req.body, success: true });
})

module.exports = router;
