import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { fetchWithToken } from '../fetchUtils';
import '../styles/Profile.css';

const Profile = () => {
    const [member, setMember] = useState(null);
    const [comemoracoes, setComemoracoes] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                // Fetching profile data and events data
                const profileResponse = await fetchWithToken('https://backend-v6ye.onrender.com:5000/api/profile');
                const eventsResponse = await fetchWithToken('https://backend-v6ye.onrender.com:5000/api/events');
    
                // Checking and handling profile data response
                if (profileResponse && profileResponse.member && profileResponse.comemoracoes) {
                    console.log('Dados do perfil recebidos:', profileResponse);
                    setMember(profileResponse.member || {});
                    setComemoracoes(profileResponse.comemoracoes || []);
                } else {
                    throw new Error('Erro ao processar dados do perfil');
                }
    
                // Checking and handling events data response
                if (Array.isArray(eventsResponse)) {
                    console.log('Dados dos eventos recebidos:', eventsResponse);
                    setEvents(eventsResponse);
                } else {
                    throw new Error('Erro ao processar dados dos eventos');
                }
    
            } catch (err) {
                console.error('Erro ao carregar os dados do perfil ou eventos:', err);
                setError(err.message); // Display the error message in the UI
            } finally {
                setLoading(false);
            }
        };
    
        fetchProfileData();
    }, []);
    

    if (loading) return <p className="loading">Carregando...</p>;
    if (error) return <p className="error">{error}</p>;


    return (
        <div className="profile-container">
            {member && Object.keys(member).length > 0 ? (
                <>
                    <div className="profile-header">
                        <img src="URL_DA_IMAGE" alt={`${member.nome}`} />
                        <h1> {member.nome}</h1>
                    </div>

                    <div className="profile-info">
                        <p>Email: {member.email}</p>
                        <p>Data de Nascimento: {new Date(member.data_nascimento).toLocaleDateString()}</p>
                        <p>Celular: {member.celular}</p>
                    </div>

                    <h2><i className="fas fa-calendar-alt"></i> Comemorações</h2>
                    <ul className="comemoracoes">
                        {comemoracoes.map((comem, index) => (
                            <li key={index}>
                                <p>{comem.descricao}</p>
                            </li>
                        ))}
                    </ul>

                    <h2><i className="fas fa-calendar-alt"></i> Eventos</h2>
                    <ul className="eventos">
                        {events.map(event => (
                            <li key={event.id}>
                                <h3>{event.titulo}</h3>
                                <p>Data: {new Date(event.data).toLocaleDateString()}</p>
                                <p>Início: {event.inicio}</p>
                                <p>Término: {event.termino}</p>
                                <p>Descrição: {event.descricao}</p>
                            </li>
                        ))}
                    </ul>

                </>
            ) : (
                <p>Nenhum dado disponível para o perfil.</p>
            )}
        </div>
    );
};

export default Profile; 











































