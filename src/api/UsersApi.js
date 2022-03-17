export class UsersApi {
  constructor(axios) {
    this.axios = axios
  }
  //注册账号
  createUser(username, password) {
    return this.axios.post("/api/users", { password: password, username: username })
  }
  //登录账号
  getLogin(username, password) {
    return this.axios.post("/api/access/login", { password: password, username: username })
  }
  //登出账号
  getLogout() {
    return this.axios.post("/api/access/logout", {})
  }
  getMe() {
    return this.axios.get("/api/access/me")
  }
  //获取分省表格信息
  getTableData(mapScope) {
    return this.axios.get("/api/records/ranking/" + mapScope)
  }
  // 获取mapScope对应的GeoJSON
  getGeoJSON(mapScope) {
    return this.axios.get("/api/static/" + mapScope + ".json")
  }

  // getGeoJSON (url) {
  //   return this.axios.get(url)
  // }

  // 获取mapScope对应的整体数据
  getTotalCount(mapScope) {
    return this.axios.get("/api/records/getTotalCount/" + mapScope)
  }



  // 获取mapScope对应的各个行政区的数据
  getDistrictCount(mapScope) {
    return this.axios.get("/api/records/getDistrictCount/" + mapScope)
  }

  // 获取国内省会的高、中风险区
  getCapitalInfo() {
    return this.axios.get("/api/risky-areas/getRiskyAreasOfCapital")
  }

  // 获取地区的历史数据列表
  getDistrictHistory(areaId) {
    return this.axios.get("/api/records" + "?areaId=" + areaId)
  }

  getSickmanInfo(flightNumber, area, date) {
    return this.axios.get("url", {
      params: {
        flightNumber: flightNumber,
        area: area,
        date: date,
      }
    })
  }

  getFlightInfo(fNumber, area, date) {
    return this.axios.get("url", {
      params: {
        fNumber: fNumber,
        area: area,
        date: date,
      }
    })
  }

  getNews() {
    return this.axios.get("/api/news/getNews")
  }
  // 获取全中国的高、中风险区信息
  getRiskyAreas() {
    return this.axios.get("/api/risky-areas")
  }

  //获取疫情看板的数据
  getPanelRecords(id) {
    return this.axios.get("/api/panel-records?areaId=" + id + "&endTime=999999999999&limit=1")
  }
  // 获取常识和辟谣
  getTips() {
    return this.axios.get("/api/tips")
  }
  // 获取定位点的疫情数据
  getmylocation_data() {
    return this.axios.get("/api/records/multi-level/my-location")
  }
  // 获取问题列表
  getQuestionList() {
    return this.axios.get("/api/questions")
  }

  // 获取问题
  getQuestion(questionId) {
    return this.axios.get("/api/questions/" + questionId)
  }

  // 获取答案
  getAnswerList(questionId) {
    return this.axios.get("/api/answers?questionId=" + questionId)
  }


  /* ----------------- POST ------------------- */

  // 发表问题
  postQuestion(params) {
    return this.axios.post("/api/questions", params)
  }

  postAnswer(params) {
    return this.axios.post("/api/answers", params)
  }
  //根据输入模糊匹配搜索地区
  ChangeLocation(area) {
    return this.axios.get("/api/areas/changeLocation/" + area)
  }
  //获取具体的省市的疫情数据
  getCityAndProvinceRecords(area) {
    return this.axios.get("/api/records/multi-level/" + area)
  }

}