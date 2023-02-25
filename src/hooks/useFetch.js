import { useState, useEffect, useRef } from 'react';


export const useFetch = ( url ) => {
    
	const isMounted = useRef(false);
	const [state, setState] = useState({ data: null, loading: true, error: null });

	useEffect(() => {
		isMounted.current = true;

		return () => {
			isMounted.current = false;
		}
	}, []);


	useEffect( () => {

		setState({ data: null, loading: true, error: null });

		fetch( url )
			.then( resp => resp.json() )
			.then( data => {

				if ( isMounted.current ) {
					setState({
						data,
						loading: false,
						error: data.status_message !== undefined ? data.status_message : null,
					});
				}

			})
			.catch( () => {
				setState({
					data: null,
					loading: false,
					error: 'No se pudo cargar la info'
				})
			})

	},[url]);

	return state;
}
