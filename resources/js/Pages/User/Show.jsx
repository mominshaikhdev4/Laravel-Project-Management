import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import TasksTable from "../Task/TasksTable";

export default function Show({ auth, user, tasks, queryParams }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          {`User "${user.name}"`}
        </h2>
      }
    >
      <Head title={`User "${user.name}"`} />
      
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="grid gap-4 grid-cols-2">
                <div>
                  <div>
                    <label className="font-bold text-lg text-gray-400">User ID</label>
                    <p className="mt-1 text-white">{user.id}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg text-gray-400">User Name</label>
                    <p className="mt-1 text-white">{user.name}</p>
                  </div>
                </div>
                <div>
                  <div>
                    <label className="font-bold text-lg text-gray-400">Email Address</label>
                    <p className="mt-1 text-white">{user.email}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg text-gray-400">Create Date</label>
                    <p className="mt-1 text-white">{user.created_at}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h3 className="text-xl font-semibold mb-4 text-white">Assigned Tasks</h3>
              <TasksTable
                tasks={tasks}
                queryParams={queryParams}
                routeName="user.show"
                routeParams={user.id}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
