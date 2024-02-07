export const lotteryConfig = [
  {
    id: 1,
    name: '頭獎',
    quantity: 1,
    amount: 10000,
    pool: 'all',
    finish: false
  },
  {
    id: 2,
    name: '一獎',
    quantity: 2,
    amount: 8000,
    pool: 'all',
    finish: false
  },
  {
    id: 3,
    name: '二獎',
    quantity: 3,
    amount: 5000,
    pool: 'all',
    finish: false
  },
  {
    id: 4,
    name: '三獎',
    quantity: 4,
    amount: 3000,
    pool: 'all',
    finish: false
  },
  {
    id: 5,
    name: '肆獎',
    quantity: 5,
    amount: 2000,
    pool: 'all',
    finish: false
  },
  {
    id: 6,
    name: '愛酷獎',
    quantity: 5,
    amount: 1000,
    pool: 'all',
    finish: false
  },
  {
    id: 7,
    name: '加碼獎',
    quantity: 5,
    amount: 3000,
    pool: 'senior',
    finish: false
  }
]

export const lotteryPool = {
  all: [
    { name: '鄭淑芳 Lily', empId: 'A0004', dept: '財務部', win: false },
    { name: '程俐涵 Melody', empId: 'A0007', dept: '財務部', win: false },
    { name: '林家暄 Chantal', empId: 'A0010', dept: '商務拓展組', win: false },
    { name: '張皓博 Jeff', empId: 'A0013', dept: 'AccuCDP營運部', win: false },
    {
      name: '曾詩婷 Jean Tseng',
      empId: 'A0014',
      dept: '專案研發科技部',
      win: false
    },
    {
      name: '許煒駿 Alan Hsu',
      empId: 'A0019',
      dept: 'AccuNix營運部',
      win: false
    },
    {
      name: '張譽騰 Jason Chang',
      empId: 'A0021',
      dept: '商務拓展組',
      win: false
    },
    {
      name: '蕭惟元 William Hsiao',
      empId: 'A0022',
      dept: '商務拓展組',
      win: false
    },
    { name: '陳楷文 Kevin', empId: 'A0030', dept: '商務長室CBO', win: false },
    {
      name: '何孟輯 Marc Ho',
      empId: 'A0037',
      dept: 'AccuCDP營運部',
      win: false
    },
    { name: '陳薇宇 Karen', empId: 'A0039', dept: 'AccuNix營運部', win: false },
    {
      name: '陳建宇 James',
      empId: 'A0044',
      dept: '專案研發科技部',
      win: false
    },
    { name: '李思蓁 Kelly', empId: 'A0052', dept: '財務部', win: false },
    {
      name: '陳佳瑋 Tom Chen',
      empId: 'A0059',
      dept: 'AccuNix營運部',
      win: false
    },
    {
      name: '闕源辰 Ethan',
      empId: 'A0078',
      dept: '雲端架構暨技術研發部',
      win: false
    },
    {
      name: '陳耀峰 Bob Cheng',
      empId: 'A0084',
      dept: 'AccuNix營運部',
      win: false
    },
    {
      name: '林耕荷 Cindy Lin',
      empId: 'A0087',
      dept: 'AccuNix營運部',
      win: false
    },
    { name: '許項涵 Shawn', empId: 'A0093', dept: 'AccuCDP營運部', win: false },
    {
      name: '王姿喨 Maureen Wang',
      empId: 'A0096',
      dept: '品牌營運中心',
      win: false
    },
    {
      name: '楊秉叡 Benny Yang',
      empId: 'A0100',
      dept: 'AccuCDP營運部',
      win: false
    }
  ],
  senior: [
    { name: '鄭淑芳 Lily', empId: 'A0004', dept: '財務部', win: false },
    { name: '程俐涵 Melody', empId: 'A0007', dept: '財務部', win: false },
    { name: '林家暄 Chantal', empId: 'A0010', dept: '商務拓展組', win: false },
    { name: '張皓博 Jeff', empId: 'A0013', dept: 'AccuCDP營運部', win: false },
    {
      name: '曾詩婷 Jean Tseng',
      empId: 'A0014',
      dept: '專案研發科技部',
      win: false
    },
    {
      name: '許煒駿 Alan Hsu',
      empId: 'A0019',
      dept: 'AccuNix營運部',
      win: false
    },
    {
      name: '張譽騰 Jason Chang',
      empId: 'A0021',
      dept: '商務拓展組',
      win: false
    },
    {
      name: '蕭惟元 William Hsiao',
      empId: 'A0022',
      dept: '商務拓展組',
      win: false
    },
    { name: '陳楷文 Kevin', empId: 'A0030', dept: '商務長室CBO', win: false },
    {
      name: '何孟輯 Marc Ho',
      empId: 'A0037',
      dept: 'AccuCDP營運部',
      win: false
    },
    { name: '陳薇宇 Karen', empId: 'A0039', dept: 'AccuNix營運部', win: false },
    {
      name: '陳建宇 James',
      empId: 'A0044',
      dept: '專案研發科技部',
      win: false
    },
    { name: '李思蓁 Kelly', empId: 'A0052', dept: '財務部', win: false },
    {
      name: '陳佳瑋 Tom Chen',
      empId: 'A0059',
      dept: 'AccuNix營運部',
      win: false
    },
    {
      name: '闕源辰 Ethan',
      empId: 'A0078',
      dept: '雲端架構暨技術研發部',
      win: false
    }
  ]
}

export const lotteryResult = {
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
  7: []
}
