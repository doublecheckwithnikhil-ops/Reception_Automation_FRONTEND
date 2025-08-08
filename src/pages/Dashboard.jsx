import { Helmet } from 'react-helmet';
import CustomCard from '../components/customCard';import { useGetCandidateVisitsTodays } from '../apis/candidateVisit';
import { useGetSendMaterialsToday } from '../apis/sendMaterial';
import { useGetReceiveMaterialsToday } from '../apis/receiveMaterial';
import { useGetVendorVisitsToday } from '../apis/vendorVisit';
import { useMemo } from 'react';
;

const Daashboard = () => {

  const empty = useMemo(() => [], []);

  const { data: candidate = empty, isLoading } = useGetCandidateVisitsTodays();
  const { data: sendMaterials = empty, isLoading: isGetSendMaterialLoading } = useGetSendMaterialsToday();
  const { data: receiveMaterial = empty, isGetReceiveMaterialLoading } = useGetReceiveMaterialsToday();
  const { data: vendorVisitList = empty, isLoading: isVendorVisitLoading } = useGetVendorVisitsToday();

  return (
    <>
      <Helmet>
        <title>DashBoard</title>
      </Helmet>

      <h2 className="text-3xl font-medium text-gray-800  ">Dashboard</h2>
      <h6 className='text-lg text-gray-700 '>Today's Activity</h6>
      {/* <p className="text-gray-700 leading-relaxed">
        This is the main content area. The sidebar on the left is collapsible.
        Click the menu icon to expand or collapse it.
        The layout is responsive and adapts to different screen sizes.
      </p> */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <CustomCard data={receiveMaterial} title="Courier Transction (IN)" path="/courier" compKey="receiver" />
        <CustomCard data={sendMaterials} title="Courier Transction (OUT)" path="/courier" compKey="send" />
        <CustomCard data={vendorVisitList} title="Vendor Visit" path="/vendor-visit" compKey="vendor" />
        <CustomCard data={candidate} title="Candidate Visit" path="/candidate-visit" compKey="candidate" />
      </div>
    </>


  );
};

export default Daashboard;