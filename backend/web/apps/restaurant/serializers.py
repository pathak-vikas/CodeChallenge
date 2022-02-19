from restaurant.models import (
    index,
    GetQuality,
    LdqaType,
    LdqaTypesView,
    LdqaTypeMeasure,
    FileUploadView,
    DownloadFile,
    ViewFiles,
)



class ConfigurationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Configuration
        fields = '__all__'