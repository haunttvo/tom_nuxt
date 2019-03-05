export default function({ store, route, redirect }){
    if(!route.params.idCpt) return redirect('/admin');
}