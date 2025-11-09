import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            {/* Hero Section */}
            <section className="d-flex align-items-center hero-fullscreen-height">
                <div className="container text-center">
                    <h2 className="display-4 mb-5 mb-md-4">La solution simple et efficace pour organiser vos projets et collaborer en équipe</h2>
                    <div className="d-flex gap-3 justify-content-center flex-column flex-md-row align-items-center">
                        <Link to="/register" className="btn btn-primary w-auto btn-lg">Commencer maintenant</Link>
                        <Link to="/login" className="btn btn-outline-primary w-auto btn-lg">Se connecter</Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="d-flex flex-column align-items-center text-center container mb-5">
                <h2>Une gestion de projets simplifiée</h2>
                <p className="mb-4">Tout ce dont vous avez besoin pour mener à bien vos projets, sans complexité inutile.</p>

                <div className="d-flex flex-column flex-md-row gap-5 row-gap-4 justify-content-center">
                    <div style={{maxWidth: '350px'}}>
                        <h3>📋 Créez vos projets</h3>
                        <p className="text-body-secondary">Organisez votre travail en créant des projets clairs et structurés. Définissez vos objectifs et suivez votre progression en temps réel.</p>
                    </div>

                    <div style={{maxWidth: '350px'}}>
                        <h3>✅ Gérez vos tâches</h3>
                        <p className="text-body-secondary">Décomposez vos projets en tâches simples et concrètes. Suivez facilement ce qui est fait et ce qui reste à accomplir.</p>
                    </div>

                    <div style={{maxWidth: '350px'}}>
                        <h3>👥 Collaborez en équipe</h3>
                        <p className="text-body-secondary">Assignez des tâches à vos collaborateurs et travaillez ensemble efficacement. Chacun accède à ses tâches personnalisées.</p>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="d-flex flex-column align-items-center text-center container mb-5">
                <h2 className="mb-4">Comment ça marche ?</h2>
                <div className="d-flex flex-column flex-md-row gap-5 row-gap-4 justify-content-center">
                    <div>
                        <h4>1. Créez votre compte</h4>
                        <p className="text-body-secondary">Inscription rapide et gratuite en quelques clics</p>
                    </div>
                    <div>
                        <h4>2. Ajoutez vos projets</h4>
                        <p className="text-body-secondary">Créez vos premiers projets et définissez vos objectifs</p>
                    </div>
                    <div>
                        <h4>3. Organisez vos tâches</h4>
                        <p className="text-body-secondary">Décomposez vos projets en tâches et assignez-les</p>
                    </div>
                    <div>
                        <h4>4. Collaborez</h4>
                        <p className="text-body-secondary">Travaillez en équipe et suivez l'avancement</p>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="d-flex flex-column align-items-center text-center container mb-5">
                <h2 className="mb-4">Pourquoi choisir notre gestionnaire ?</h2>
                <div className="d-flex flex-column flex-md-row gap-5 row-gap-4 justify-content-center">
                    <div>
                        <h4>🚀 Simplicité d'usage</h4>
                        <p className="text-body-secondary">Interface intuitive, prise en main immédiate. Pas de formation nécessaire.</p>
                    </div>
                    <div>
                        <h4>⚡ Efficacité garantie</h4>
                        <p className="text-body-secondary">Fonctionnalités essentielles sans superflu. Concentrez-vous sur l'essentiel.</p>
                    </div>
                    <div>
                        <h4>🎯 Vision claire</h4>
                        <p className="text-body-secondary">Tableau de bord personnalisé pour chaque utilisateur. Voyez vos tâches en un coup d'œil.</p>
                    </div>
                    <div>
                        <h4>🤝 Collaboration fluide</h4>
                        <p className="text-body-secondary">Assignation simple des tâches. Chacun sait ce qu'il a à faire.</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <div className="mx-3">
                <section className="d-flex flex-column align-items-center text-center container py-4 py-sm-5 mb-5 border border-primary rounded-3 bg-light">
                    <h2 className="mb-3">Prêt à organiser vos projets ?</h2>
                    <p className="lead mb-4 text-body-secondary">Rejoignez les équipes qui ont choisi la simplicité pour leur gestion de projets</p>
                    <div className="mb-3">
                        <Link to="/register" className="btn btn-primary btn-lg px-4">Créer mon compte gratuitement</Link>
                    </div>
                    <p className="text-body-secondary">Déjà inscrit ? <Link to="/login" className="link-primary text-decoration-none">Connectez-vous ici</Link></p>
                </section>
            </div>

        </div>
    );
}

export default Home;