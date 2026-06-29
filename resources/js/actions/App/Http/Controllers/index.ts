import DashboardController from './DashboardController'
import ProjectController from './ProjectController'
import TaskController from './TaskController'
import UserController from './UserController'
import ProfileController from './ProfileController'
const Controllers = {
    DashboardController: Object.assign(DashboardController, DashboardController),
ProjectController: Object.assign(ProjectController, ProjectController),
TaskController: Object.assign(TaskController, TaskController),
UserController: Object.assign(UserController, UserController),
ProfileController: Object.assign(ProfileController, ProfileController),
}

export default Controllers