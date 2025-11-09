import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            {/* Hero Section */}
            <section>
                <h1>Gestionnaire de Projets</h1>
                <p>La solution simple et efficace pour organiser vos projets et collaborer en équipe</p>
                <div>
                    <Link to="/register">Commencer maintenant</Link>
                    <Link to="/login">Se connecter</Link>
                </div>
            </section>

            {/* Features Section */}
            <section>
                <h2>Une gestion de projets simplifiée</h2>
                <p>Tout ce dont vous avez besoin pour mener à bien vos projets, sans complexité inutile.</p>
                
                <div>
                    <div>
                        <h3>📋 Créez vos projets</h3>
                        <p>Organisez votre travail en créant des projets clairs et structurés. Définissez vos objectifs et suivez votre progression en temps réel.</p>
                    </div>
                    
                    <div>
                        <h3>✅ Gérez vos tâches</h3>
                        <p>Décomposez vos projets en tâches simples et concrètes. Suivez facilement ce qui est fait et ce qui reste à accomplir.</p>
                    </div>
                    
                    <div>
                        <h3>👥 Collaborez en équipe</h3>
                        <p>Assignez des tâches à vos collaborateurs et travaillez ensemble efficacement. Chacun accède à ses tâches personnalisées.</p>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section>
                <h2>Comment ça marche ?</h2>
                <div>
                    <div>
                        <h4>1. Créez votre compte</h4>
                        <p>Inscription rapide et gratuite en quelques clics</p>
                    </div>
                    <div>
                        <h4>2. Ajoutez vos projets</h4>
                        <p>Créez vos premiers projets et définissez vos objectifs</p>
                    </div>
                    <div>
                        <h4>3. Organisez vos tâches</h4>
                        <p>Décomposez vos projets en tâches et assignez-les</p>
                    </div>
                    <div>
                        <h4>4. Collaborez et progressez</h4>
                        <p>Travaillez en équipe et suivez l'avancement</p>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section>
                <h2>Pourquoi choisir notre gestionnaire ?</h2>
                <div>
                    <div>
                        <h4>🚀 Simplicité d'usage</h4>
                        <p>Interface intuitive, prise en main immédiate. Pas de formation nécessaire.</p>
                    </div>
                    <div>
                        <h4>⚡ Efficacité garantie</h4>
                        <p>Fonctionnalités essentielles sans superflu. Concentrez-vous sur l'essentiel.</p>
                    </div>
                    <div>
                        <h4>🎯 Vision claire</h4>
                        <p>Tableau de bord personnalisé pour chaque utilisateur. Voyez vos tâches en un coup d'œil.</p>
                    </div>
                    <div>
                        <h4>🤝 Collaboration fluide</h4>
                        <p>Assignation simple des tâches. Chacun sait ce qu'il a à faire.</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section>
                <h2>Prêt à organiser vos projets ?</h2>
                <p>Rejoignez les équipes qui ont choisi la simplicité pour leur gestion de projets</p>
                <div>
                    <Link to="/register">Créer mon compte gratuitement</Link>
                </div>
                <p>Déjà inscrit ? <Link to="/login">Connectez-vous ici</Link></p>
            </section>

        </div>
    );
}

export default Home;