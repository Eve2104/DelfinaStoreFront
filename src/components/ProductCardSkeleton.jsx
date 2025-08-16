export default function ProductCardSkeleton(){
  return (
    <article className="card h-100">
      <div className="ratio ratio-1x1 skel rounded-top" />
      <div className="card-body">
        <div className="skel rounded mb-2" style={{height:14, width:'70%'}} />
        <div className="skel rounded mb-3" style={{height:10, width:'90%'}} />
        <div className="d-flex justify-content-between align-items-center">
          <div className="skel rounded" style={{height:24, width:80}} />
          <div className="skel rounded" style={{height:32, width:120}} />
        </div>
      </div>
    </article>
  );
}
