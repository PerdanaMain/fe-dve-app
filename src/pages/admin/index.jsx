// import LazyLoad from "../../components/lazy-load";
import { SectionCards } from "../../components/equipments/section-card";
import { DataTableEquipment } from "../../components/equipments/equipment-table";

const Dashboard = () => {
  return (
    <div>
      {/* <LazyLoad /> */}
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <div className="px-4 lg:px-6">
              <DataTableEquipment />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
