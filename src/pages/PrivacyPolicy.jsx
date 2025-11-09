function PrivacyPolicy() {
    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow-sm">
                        <div className="card-body p-5">
                            <h1 className="mb-4">Politique de confidentialité</h1>
                            <p className="lead mb-4">
                                Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos données personnelles lors de l'utilisation de Projects Manager.
                            </p>
                            <p className="text-muted small">
                                <strong>Date d'entrée en vigueur :</strong> 9 novembre 2025<br />
                                <strong>Dernière mise à jour :</strong> 9 novembre 2025
                            </p>

                            <hr className="my-4" />

                            <section className="mb-4">
                                <h2 className="h4 mb-3">1. Responsable du traitement</h2>
                                <p>
                                    Le responsable du traitement des données est :
                                </p>
                                <div className="bg-light p-3 rounded">
                                    <strong>Léo Peyronnet</strong><br />
                                    Micro-entreprise<br />
                                    Email : <a href="mailto:peyronnet.leo@gmail.com">peyronnet.leo@gmail.com</a>
                                </div>
                            </section>

                            <section className="mb-4">
                                <h2 className="h4 mb-3">2. Données collectées</h2>
                                <p>Nous collectons uniquement les données strictement nécessaires au fonctionnement de l'application :</p>
                                <ul>
                                    <li><strong>Données d'identification :</strong> nom d'utilisateur choisi lors de l'inscription</li>
                                    <li><strong>Données d'authentification :</strong> mot de passe (stocké sous forme hachée et sécurisée)</li>
                                    <li><strong>Données de projets :</strong> nom des projets que vous créez, identifiant du créateur</li>
                                    <li><strong>Données de tâches :</strong> titre des tâches, utilisateur assigné, statut d'avancement</li>
                                </ul>
                                <div className="alert alert-info">
                                    <i className="bi bi-info-circle me-2"></i>
                                    Nous ne collectons aucune donnée personnelle identifiable comme votre nom réel, adresse email, ou informations de contact.
                                </div>
                            </section>

                            <section className="mb-4">
                                <h2 className="h4 mb-3">3. Finalités du traitement</h2>
                                <p>Vos données sont utilisées exclusivement pour :</p>
                                <ul>
                                    <li>Vous permettre de vous authentifier et d'accéder à votre compte</li>
                                    <li>Gérer vos projets et tâches</li>
                                    <li>Permettre la collaboration avec d'autres utilisateurs (assignation de tâches)</li>
                                    <li>Assurer le bon fonctionnement de l'application</li>
                                </ul>
                            </section>

                            <section className="mb-4">
                                <h2 className="h4 mb-3">4. Base légale</h2>
                                <p>
                                    Le traitement de vos données est fondé sur l'<strong>exécution d'un contrat</strong> (fourniture du service Projects Manager) et sur votre <strong>consentement</strong> lors de la création de votre compte.
                                </p>
                            </section>

                            <section className="mb-4">
                                <h2 className="h4 mb-3">5. Partage des données</h2>
                                <div className="alert alert-success">
                                    <i className="bi bi-shield-check me-2"></i>
                                    <strong>Aucune donnée n'est partagée avec des tiers.</strong> Vos données restent strictement confidentielles et ne sont accessibles qu'aux autres utilisateurs de l'application dans le cadre de la collaboration sur les projets (visibilité des tâches qui vous sont assignées).
                                </div>
                            </section>

                            <section className="mb-4">
                                <h2 className="h4 mb-3">6. Stockage et sécurité</h2>
                                <ul>
                                    <li><strong>Localisation :</strong> vos données sont stockées sur des serveurs sécurisés hébergés par OVH en Europe</li>
                                    <li><strong>Chiffrement :</strong> tous les échanges sont sécurisés par HTTPS</li>
                                    <li><strong>Mots de passe :</strong> stockés sous forme hachée et ne peuvent pas être récupérés en clair</li>
                                    <li><strong>Accès :</strong> seul le responsable du traitement a accès aux données</li>
                                </ul>
                            </section>

                            <section className="mb-4">
                                <h2 className="h4 mb-3">7. Cookies</h2>
                                <p>
                                    L'application utilise uniquement des cookies techniques essentiels :
                                </p>
                                <ul>
                                    <li><strong>Cookie d'authentification :</strong> cookie httpOnly contenant votre jeton d'accès (JWT) pour maintenir votre session connectée</li>
                                    <li>Ces cookies sont supprimés automatiquement lors de votre déconnexion</li>
                                    <li>Aucun cookie de traçage ou d'analyse n'est utilisé</li>
                                </ul>
                            </section>

                            <section className="mb-4">
                                <h2 className="h4 mb-3">8. Durée de conservation</h2>
                                <p>
                                    Vos données sont conservées :
                                </p>
                                <ul>
                                    <li>Pendant toute la durée d'utilisation de votre compte</li>
                                    <li>Actuellement, la suppression de compte doit être demandée manuellement</li>
                                    <li>En cas de suppression, toutes vos données seront définitivement effacées</li>
                                </ul>
                            </section>

                            <section className="mb-4">
                                <h2 className="h4 mb-3">9. Vos droits</h2>
                                <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                                <ul>
                                    <li><strong>Droit d'accès :</strong> connaître les données que nous avons sur vous</li>
                                    <li><strong>Droit de rectification :</strong> corriger vos données inexactes</li>
                                    <li><strong>Droit à l'effacement :</strong> demander la suppression de vos données</li>
                                    <li><strong>Droit à la portabilité :</strong> récupérer vos données dans un format lisible</li>
                                    <li><strong>Droit d'opposition :</strong> vous opposer au traitement</li>
                                </ul>
                                <div className="alert alert-primary">
                                    <i className="bi bi-envelope me-2"></i>
                                    Pour exercer ces droits, contactez-nous à : <a href="mailto:peyronnet.leo@gmail.com">peyronnet.leo@gmail.com</a>
                                </div>
                            </section>

                            <section className="mb-4">
                                <h2 className="h4 mb-3">10. Modifications</h2>
                                <p>
                                    Cette politique de confidentialité peut être mise à jour. En cas de modification importante, nous vous en informerons par un message dans l'application.
                                </p>
                            </section>

                            <section className="mb-4">
                                <h2 className="h4 mb-3">11. Contact</h2>
                                <p>
                                    Pour toute question concernant cette politique de confidentialité ou le traitement de vos données, vous pouvez nous contacter à :
                                </p>
                                <div className="bg-light p-3 rounded">
                                    <strong>Email :</strong> <a href="mailto:peyronnet.leo@gmail.com">peyronnet.leo@gmail.com</a><br />
                                    <strong>Objet :</strong> "Politique de confidentialité - Projects Manager"
                                </div>
                            </section>

                            <hr className="my-4" />

                            <div className="text-center">
                                <button 
                                    className="btn btn-outline-primary"
                                    onClick={() => window.history.back()}
                                >
                                    <i className="bi bi-arrow-left me-2"></i>
                                    Retour
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PrivacyPolicy;