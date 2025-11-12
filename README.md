# Outil d'aide à la redaction de SOP AI Friendly
Afin d’éviter des coûts de retraitement des nouvelles SOP le jour où le LFB souhaitera développer un bot IA permettant aux opérationnels d’obtenir des responses immédiates et personnalisées, les nouvelles SOP devraient respecter les règles suivantes :
- Etre dans un format structuré (format markdown et non pdf, titre et sous-titre, liste, meta données)
- Avoir des informations facilement interprétables par l’IA (pas de capture d’écran, pas de liste à plusieurs niveaux, pas de tableau, introduction en début de section et de liste, transitions)
- Aller droit au but sans informations parasites / consommatrices de ressources (pas d’image, picto, pas d’en-tête ou de pied de page, pas de liens url, pas d’espaces surnuméraires)
- Éviter tout flou (jargon et acronyme non défini, pronom) ou ambiguïté (incohérence entre SOP/Definition)
- Proche des demandes qui seront faites au bot IA (présence d’un Q&A)

Pour ce faire, nous mettons en place un mini outil facilitant pour :
- créer, via un éditeur simple, la SOP au format markdown (facilement lisible par l’IA) et au format pdf (facilement lisible par l’humain) ;
- Gérer les meta données permettent de préciser le périmètre de la SOP ;
- Détecter le respect des règles pré-citées pour des SOP AI et Human Friendly.

# Sources
Pour aller plus loin, quelques ressources particulièrement pertinentes : 
- AWS Prescriptive Guidance: Writing best practices to optimize RAG
applications : https://docs.aws.amazon.com/pdfs/prescriptive-guidance/latest/writing-best-practices-rag/writing-best-practices-rag.pdf#introduction
- DGE - Guide de la génération augmentée par récupération (RAG) : https://www.entreprises.gouv.fr/files/files/Publications/2024/Guides/20241127-bro-guide-ragv4-interactif.pdf
- Boosting RAG Performance through Glossary Integration ― A LlamaIndex Hands-On Tutorial : https://itnext.io/boosting-rag-performance-through-glossary-integration-a-llamaindex-hands-on-tutorial-d8a4bd568345
- AI Course | How to Optimize your Files for RAG : https://m.youtube.com/playlist?list=PLlJHGGklthGkngxStUO54MevanrpqKHg5

_Version : 1.1.31_
