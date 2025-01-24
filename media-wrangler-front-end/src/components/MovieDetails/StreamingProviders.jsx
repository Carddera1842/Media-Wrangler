import axios from "axios";
import React, { useEffect, useState } from "react";

const StreamingProviders = ({ movieId }) => {
    const [providers, setProviders] = useState({ buy: [], rent: [], streaming: [] });
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/movies/streaming/${movieId}`);
                console.log("API Response:", response.data);
                if (response.headers['content-type'].includes('application/json')) {
                    setProviders(response.data || { buy: [], rent: [], streaming: [] });
                }
            } catch (err) {
                console.error('Error fetching streaming providers:', err.message);
                setError('Failed to load streaming providers.');
            }
            
        };
        console.log(providers);
        fetchProviders();
        
    }, [movieId]);

    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Streaming Providers</h1>
            {Object.keys(providers).length === 0 || 
            (providers.buy.length === 0 && providers.rent.length === 0 && providers.streaming.length === 0) ? (
                <p>No streaming providers available.</p>
            ) : (
                <>
                    {providers.buy?.length > 0 && (
                        <div>
                            <h2>Buy</h2>
                            <ul>
                                {providers.buy.map((provider, index) => (
                                    <li key={index}>
                                        <img 
                                            src={provider.logoPath} 
                                            alt={provider.providerName} 
                                            style={{ width: "50px", marginRight: "10px" }} 
                                        />
                                        {provider.providerName}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {providers.rent?.length > 0 && (
                        <div>
                            <h2>Rent</h2>
                            <ul>
                                {providers.rent.map((provider, index) => (
                                    <li key={index}>
                                        <img 
                                            src={provider.logoPath} 
                                            alt={provider.providerName} 
                                            style={{ width: "50px", marginRight: "10px" }} 
                                        />
                                        {provider.providerName}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {providers.streaming?.length > 0 && (
                        <div>
                            <h2>Streaming</h2>
                            <ul>
                                {providers.streaming.map((provider, index) => (
                                    <li key={index}>
                                        <img 
                                            src={provider.logoPath} 
                                            alt={provider.providerName} 
                                            style={{ width: "50px", marginRight: "10px" }} 
                                        />
                                        {provider.providerName}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default StreamingProviders;