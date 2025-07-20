import LazyLoad from "../../components/lazy-load";
import RegisteredUserDataTable from "../../components/registered-user";
import { getRegisteredUsers } from "../../services/admin.service";
import { useMutation } from "@tanstack/react-query";
import secureLocalStorage from "react-secure-storage";
import { STORAGE_KEY } from "../../utils/env";
import { useEffect } from "react";

const RegisteredUser = () => {
  const { data, isSuccess, mutateAsync } = useMutation({
    mutationFn: (data) => getRegisteredUsers(data),
  });

  useEffect(() => {
    async function fetchData() {
      const token = secureLocalStorage.getItem(STORAGE_KEY);
      await mutateAsync(token);
    }
    fetchData();
  }, [mutateAsync]);

  return (
    <div>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6">
              {!isSuccess ? (
                <LazyLoad />
              ) : (
                <RegisteredUserDataTable data={data.data} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisteredUser;
