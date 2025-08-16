export default function DetailSkeleton(){
  return (
    <div className="container-xl py-4">
      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <div className="ratio ratio-4x3 skel rounded-3" />
          <div className="skel rounded mt-2" style={{height:12, width:'40%'}} />
        </div>
        <div className="col-12 col-lg-6">
          <div className="skel rounded mb-2" style={{height:28, width:'60%'}} />
          <div className="skel rounded mb-2" style={{height:12, width:'50%'}} />
          <div className="skel rounded mb-3" style={{height:28, width:140}} />
          <div className="skel rounded mb-3" style={{height:36, width:'60%'}} />
          <div className="row g-3">
            <div className="col-12 col-sm-4"><div className="skel rounded" style={{height:88}}/></div>
            <div className="col-12 col-sm-4"><div className="skel rounded" style={{height:88}}/></div>
            <div className="col-12 col-sm-4"><div className="skel rounded" style={{height:88}}/></div>
          </div>
        </div>
      </div>
    </div>
  );
}
