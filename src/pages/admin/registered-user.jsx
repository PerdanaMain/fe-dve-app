import LazyLoad from "../../components/lazy-load";
import RegisteredUserDataTable from "../../components/users/registered-user-table";
import { getRegisteredUsers } from "../../services/admin.service";
import { useMutation } from "@tanstack/react-query";
import secureLocalStorage from "react-secure-storage";
import { STORAGE_KEY } from "../../utils/env";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";

const RegisteredUser = () => {
  const { data, mutateAsync, mutate, isError } = useMutation({
    mutationFn: (data) => getRegisteredUsers(data),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = secureLocalStorage.getItem(STORAGE_KEY);
        await mutateAsync(token);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchData();
  }, [mutateAsync]);
  return (
    <div>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6">
              <RegisteredUserDataTable
                data={isError || !data ? [] : data.data}
                mutate={mutate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisteredUser;
