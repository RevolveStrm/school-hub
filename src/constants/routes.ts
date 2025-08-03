export enum Routes {
  AUTH = '/auth',
  COURSES = '/courses',
  ATTENDANCE = '/attendance'
}

export enum AuthRoutes {
  //POST
  SIGN_UP = '/signup',
  //POST
  LOG_IN = '/login',
  //GET
  LOG_OUT = '/logout',
  //POST
  REFRESH = '/refresh'
}

export enum CoursesRoutes {
  //GET
  LIST = '/',
  //POST
  CREATE = '/',
  //DELETE
  DELETE = '/:id',
  //POST
  ENROLL_COURSE = '/:id/enroll',
  //GET
  LESSONS_LIST = '/:id/lessons',
  //POST
  LESSONS_CREATE = '/:id/lessons',
  //GET
  ATTENDANCE_LIST  = '/:id/attendance',
}

export enum AttendanceRoutes {
  //POST
  MARK = '/mark'
}